import courseType from "../types/course.type.js";
import courseModel from '../../models/courses.js'
import { GraphQLInt, GraphQLList,GraphQLObjectType,GraphQLString } from 'graphql'
import createQueryFilter from "../../utils/createQueryFilter.js";
import httpStatus from 'http-status-codes'
import CreateAggregatePipeline from "../../controllers/createAggregatePipeline.js";
import autoBind from "auto-bind";
import createHttpError from "http-errors";
import validateObjectId from "../../validators/objectId.js";
import mongoose from "mongoose";
import { createNotFoundError } from "../../utils/createError.js";

const responseType = new GraphQLObjectType({
    name : 'courseResponseType',
    fields : {
        status : {type : GraphQLInt},
        message : {type : GraphQLString},
        data : {type : new GraphQLObjectType({
            name : 'courseDataResponseType',
            fields : {
                course : {type : new GraphQLList(courseType)}
            }
        })}
    }
})

class CourseQuery extends CreateAggregatePipeline {
    #aggregateSchema =  [
            ...this.userLookup('teacher'),
            ...this.categoryLookup(),
            this.likesCount(),
            
            {
                $lookup : {
                    from : 'chapters',
                    localField : 'chapters',
                    foreignField : '_id',
                    as : 'chapters'
                }
            },
            {
                $lookup : {
                    from : 'episodes',
                    localField : 'chapters.episodes',
                    foreignField : '_id',
                    as : 'chapters.episodes'
                }
            },
            {
                $project : {
                    'teacher.mobile' : 0,
                    'teacher.bills' : 0,
                    'teacher.otp' : 0
                }
            },
        ]
    
    constructor() {
        super()
        autoBind(this)
    }
    getAllCourses = {
        type : responseType,
        args : {
            teacherId : {type : GraphQLString},
            search : {type : GraphQLString},
            tags : {type : GraphQLString},
            categoryId : {type : GraphQLString},
            status : {type : GraphQLString},
            discount : {type : GraphQLString},
            price : {type : GraphQLString},
            sort : {type : GraphQLString},
            page : {type : GraphQLInt},
            pageLimit : {type : GraphQLInt},
        },
        resolve : async (obj , args , context , info) => {
            
            const queryFilter = createQueryFilter(args)
            const {page , pageLimit , sort} = args
            
            const courses = await courseModel.aggregate([
                {
                    $match : queryFilter
                }, 
                ...this.#aggregateSchema,
                {
                    $sort : {
                        [sort || 'title'] : 1
                    }
                },
                this.fileUrl(process.env.BASE_URL),
                {
                    $skip : (page - 1 || 0) * (pageLimit || 10)
                },
                {
                    $limit : pageLimit || 10
                }
            ])
            
            
            return {
                status : httpStatus.OK,
                message : '',
                data : {
                    course : courses
                }
            }

        }
    }
    getCourseById = {
        type : responseType,
        args : {
            courseId : {type : GraphQLString}
        },
        resolve : async (obj , args , context , info) => {
            const {courseId} = args
            await validateObjectId.validateAsync(courseId)
            
            const [course] = await courseModel.aggregate([
                {
                    $match : {_id : mongoose.Types.ObjectId(courseId)}
                }, 
                this.fileUrl(process.env.BASE_URL),
                ...this.#aggregateSchema,
            ])
            createNotFoundError({course})

            return {
                status : httpStatus.OK,
                message : '',
                data : {
                    course : [
                        course
                    ]
                }
            }
        }
    }
}

export default new CourseQuery()