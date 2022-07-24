import courseType from "../types/course.type.js";
import courseModel from '../../models/courses.js'
import { GraphQLInt, GraphQLList,GraphQLObjectType,GraphQLString } from 'graphql'
import createQueryFilter from "../../utils/createQueryFilter.js";
import httpStatus from 'http-status-codes'
import createResponseType from "../types/responseType.js";
import episodeModel from "../../models/course.chapter.episodes.js";
import episodeType from '../types/episode.type.js'
import mongoose from "mongoose";
import CreateAggregatePipeline from "../../controllers/createAggregatePipeline.js";
import autoBind from "auto-bind";
import validateObjectId from "../../validators/objectId.js";
import createHttpError from "http-errors";
import { createNotFoundError } from "../../utils/createError.js";


const responseType = new GraphQLObjectType({
    name : 'episodeResponseType',
    fields : {
        status : {type : GraphQLInt},
        message : {type : GraphQLString},
        data : {type : new GraphQLObjectType({
            name : 'episodeDataResponseType',
            fields : {
                episode : {type : new GraphQLList(episodeType)}
            }
        })}
    }
})


class EpisodeQuery extends CreateAggregatePipeline {
    constructor() {
        super()
        autoBind(this)
    }

    getEpisodeById = {
        type : responseType,
        args : {
            episodeId : {type : GraphQLString}
        },
        resolve : async (obj , args , context , info) => {
            const {episodeId} = args
            await validateObjectId.validateAsync(episodeId)
            
            const [episode] = await episodeModel.aggregate([
                {
                    $match : {_id : mongoose.Types.ObjectId(episodeId)}
                },
                this.fileUrl(process.env.BASE_URL , 'videoAddress')
            ])
            createNotFoundError(episode)
            return {
                status : httpStatus.OK,
                message : '',
                data : {
                    episode : [
                        episode
                    ]
                }
            }
        }
    }
}

export default new EpisodeQuery()