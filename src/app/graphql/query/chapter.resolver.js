import { GraphQLInt, GraphQLList,GraphQLObjectType,GraphQLString } from 'graphql'
import httpStatus from 'http-status-codes'
import chapterType from "../types/chapter.type.js";
import validateObjectId from "../../validators/objectId.js";
import chapterModel from "../../models/course.chapters.js";
import courseModel from '../../models/courses.js';
import { createNotFoundError } from '../../utils/createError.js';


const responseType = new GraphQLObjectType({
    name : 'chapterResponseType',
    fields : {
        status : {type : GraphQLInt},
        message : {type : GraphQLString},
        data : {type : new GraphQLObjectType({
            name : 'chapterDataResponseType',
            fields : {
                chapters : {type : new GraphQLList(chapterType)}
            }
        })}
    }
})

class ChapterQuery {
    
    getAllChapters = {
        type : responseType,
        args : {
            courseId : {type : GraphQLString}
        },
        resolve : async (obj , args , context , info) => {
            const {courseId} = args
            await validateObjectId.validateAsync(courseId)

            const course = await courseModel.findById(courseId , {_id : 1})
            createNotFoundError({course})
            const chapters = await chapterModel.find({courseId}).sort({createdAt : 1 , 'episodes.createdAt' : 1})

            return {
                status : httpStatus.OK,
                message : '',
                data : {
                    chapters
                }
            }
        }
    }
    getChapterById = {
        type : responseType,
        args : {
            chapterId : {type : GraphQLString}
        },
        resolve : async (obj , args , context , info) => {
            const {chapterId} = args
            await validateObjectId.validateAsync(chapterId)

            const chapter = await chapterModel.findById(chapterId).sort({'episodes.createdAt' : 1})
            createNotFoundError({chapter})

            return {
                status : httpStatus.OK,
                message : '',
                data : {
                    chapters : [
                        chapter
                    ]
                }
            }
        }
    }
}

export default new ChapterQuery()