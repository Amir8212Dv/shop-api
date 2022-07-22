import { GraphQLObjectType , GraphQLString , GraphQLList , GraphQLInt } from 'graphql'
import {categoryType} from './category.type.js'
import userType from './user.type.js'
import episodeType from './episode.type.js'
import chapterType from './chapter.type.js'

const courseType = new GraphQLObjectType({
    name : 'courseType',
    fields : {
        title : {type : GraphQLString},
        text : {type : GraphQLString },
        short_text : {type : GraphQLString },
        image : {type : GraphQLString},
        tags : {type : new GraphQLList(GraphQLString) },
        category : {type : categoryType },
        likes : {type : new GraphQLList(GraphQLString) },
        bookmarks : {type : new GraphQLList(GraphQLString) },
        price : {type : GraphQLInt },
        discount : {type : GraphQLInt },
        time : {type : GraphQLInt },
        status : {type : GraphQLString},
        teacher : {type : userType },
        // chapters : {type : new GraphQLList(GraphQLString) },
        chapters : {type : new GraphQLList(chapterType) },
        students : {type : new GraphQLList(GraphQLString) },
        bookmarksCount : { type : GraphQLInt },
        likesCount : { type : GraphQLInt }
    }
})

export default courseType