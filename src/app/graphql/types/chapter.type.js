import { GraphQLObjectType , GraphQLString , GraphQLList , GraphQLInt } from 'graphql'
import episodeType from './episode.type.js'

const chapterType = new GraphQLObjectType({
    name : 'chapterType',
    fields : {
        title : {type : GraphQLString},
        text : {type : GraphQLString},
        // episodes : {type : new GraphQLList(GraphQLString)},
        episodes : {type : new GraphQLList(episodeType)},
        courseId : { type : GraphQLString}
    }
})

export default chapterType