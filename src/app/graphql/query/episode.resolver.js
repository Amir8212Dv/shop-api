import courseType from "../types/course.type.js";
import courseModel from '../../models/courses.js'
import { GraphQLList,GraphQLObjectType,GraphQLString } from 'graphql'
import createQueryFilter from "../../utils/createQueryFilter.js";
import httpStatus from 'http-status-codes'
import createResponseType from "../types/responseType.js";
import episodeModel from "../../models/course.chapter.episodes.js";

const responseType = {
    episode : {type : new GraphQLList(episodeType)}
}


class episodeResolver {

    getEpisodeById = {
        type : createResponseType(responseType),
        args : {
            episodeId : {type : GraphQLString}
        },
        resolve : async (obj , args , context , info) => {
            const {episodeId} = args
            
            const episode = await episodeModel.findById(episodeId)
            if(episode) throw createHttpError.NotFound('episode not found')

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : '',
                data : {
                    episode : [
                        episode
                    ]
                }
            })
        }
    }
}

export default new episodeResolver()