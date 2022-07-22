import {GraphQLString , GraphQLObjectType , GraphQLList , GraphQLInt} from 'graphql'


const episodeType = new GraphQLObjectType({
    name : 'episodeType',
    fields : {
        title : {type : GraphQLString},
        text : {type : GraphQLString},
        videoAddress : {type : GraphQLString},
        courseId : {type : GraphQLString},
        chapterId : {type : GraphQLString},
        createdAt : {type : GraphQLString},
        time : { type : GraphQLInt },
    }
})

export default episodeType