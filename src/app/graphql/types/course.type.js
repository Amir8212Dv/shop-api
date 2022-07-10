import { GraphQLObjectType , GraphQLString , GraphQLList , GraphQLInt } from 'graphql'

const episodeType = new GraphQLObjectType({
    name : 'episodeType',
    fields : {
        title : {type : GraphQLString},
        text : {type : GraphQLString},
        time : {type : GraphQLInt },
        videoAddress : {type : GraphQLString },
        type : {type : GraphQLString },
        courseId : { type : GraphQLString},
        chapterId : { type : GraphQLString}
    }
})

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

const courseType = new GraphQLObjectType({
    name : 'courseType',
    fields : {
        title : {type : GraphQLString},
        text : {type : GraphQLString },
        short_text : {type : GraphQLString },
        image : {type : GraphQLString},
        tags : {type : new GraphQLList(GraphQLString) },
        category : {type : new GraphQLList(GraphQLString) },
        likes : {type : new GraphQLList(GraphQLString) },
        bookmarks : {type : new GraphQLList(GraphQLString) },
        price : {type : GraphQLInt },
        discount : {type : GraphQLInt },
        time : {type : GraphQLInt },
        status : {type : GraphQLString , },
        teacher : {type : GraphQLString },
        // chapters : {type : new GraphQLList(GraphQLString) },
        chapters : {type : new GraphQLList(chapterType) },
        students : {type : new GraphQLList(GraphQLString) }
    }
})

export default courseType