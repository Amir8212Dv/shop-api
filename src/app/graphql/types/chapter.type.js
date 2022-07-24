import { GraphQLObjectType , GraphQLString , GraphQLList , GraphQLInt } from 'graphql'
import episodeType from './episode.type.js'

const chapterType = new GraphQLObjectType({
    name : 'chapterType',
    fields : {
        title : {type : GraphQLString},
        text : {type : GraphQLString},
        episodes : {type : new GraphQLList(episodeType)},
        courseId : { type : GraphQLString},
        _id : {type : GraphQLString},

    }
})

export default chapterType