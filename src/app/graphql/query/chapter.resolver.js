import courseType from "../types/course.type.js";
import courseModel from '../../models/courses.js'
import { GraphQLList,GraphQLObjectType,GraphQLString } from 'graphql'
import createQueryFilter from "../../utils/createQueryFilter.js";
import httpStatus from 'http-status-codes'
import createResponseType from "../types/responseType.js";

const responseType = {
        courses : {type : new GraphQLList(courseType)}
}


class courseResolver {
    
    getAllChapters = {
        type : createResponseType(responseType),
        args : {
            courseId : {type : GraphQLString}
        },
        resolve : async (obj , args , context , info) => {
            const {courseId} = args
            await validateObjectId.validateAsync(courseId)

            const chapters = await chapterModel.find({courseId})
            // if(!course) throw createHttpError.NotFound('course not found')

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : '',
                data : {
                    chapters
                }
            })
        }
    }
    getChapterById = {
        type : createResponseType(responseType),
        args : {
            chapterId : {type : GraphQLString}
        },
        resolve : async (obj , args , context , info) => {
            const {chapterId} = args
            await validateObjectId.validateAsync(chapterId)

            const chapter = await chapterModel.findById(chapterId)
            if(!chapter) throw createHttpError.NotFound('chapter not found')

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : '',
                data : {
                    chapter : [
                        chapter
                    ]
                }
            })
        }
    }
}

export default new courseResolver()