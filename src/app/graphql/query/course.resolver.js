import courseType from "../types/course.type.js";
import courseModel from '../../models/courses.js'
import { GraphQLInt, GraphQLList,GraphQLObjectType,GraphQLString } from 'graphql'
import createQueryFilter from "../../utils/createQueryFilter.js";
import httpStatus from 'http-status-codes'
import createResponseType from "../types/responseType.js";
import Controller from "../../controllers/controller.js";
import autoBind from "auto-bind";

const responseType = {
    course : {type : new GraphQLList(courseType)}
}


class CourseQuery extends Controller {
    #aggregateSchema(page =1 , pageLimit = 10) {
        return [
            ...this.userLookup('teacher'),
            this.categoryLookup('category'),
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
            // {
            //     $unwind : '$teacher'
            // },
            // {
            //     $unwind : '$category'
            // },
            {
                $project : {
                    'teacher.mobile' : 0,
                    'teacher.bills' : 0,
                    'teacher.otp' : 0
                }
            }
        ]
    }
    constructor() {
        super()
        autoBind(this)
    }
    getAllCourses = {
        type : createResponseType(responseType),
        args : {
            teacher : {type : GraphQLString},
            search : {type : GraphQLString},
            tags : {type : GraphQLString},
            category : {type : GraphQLString},
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
                    $limit : pageLimit || 10
                },
                {
                    $skip : (page || 1) * (pageLimit || 10)
                },
                {
                    $sort : {
                        [sort] : 1
                    }
                }
            ])


            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : '',
                data : {
                    course : courses
                }
            })
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
        type : createResponseType(responseType),
        args : {
            courseId : {type : GraphQLString}
        },
        resolve : async (obj , args , context , info) => {
            const courseId = mongoose.Types.ObjectId(args.id)
            await validateObjectId.validateAsync(courseId)
            
            const course = await courseModel.aggregate([
                {
                    $match : {_id : courseId}
                }, 
                ...this.#aggregateSchema,
            ])
            if(!course) throw createHttpError.NotFound('course not found')

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : '',
                data : {
                    course : [
                        course
                    ]
                }
            })
        }
    }
}

export default new CourseQuery()