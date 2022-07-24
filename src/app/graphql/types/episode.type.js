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
        _id : {type : GraphQLString},
        videoURL : {type : GraphQLString}

    }
})

export default episodeType