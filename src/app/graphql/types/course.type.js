import { GraphQLObjectType , GraphQLString , GraphQLList , GraphQLInt, GraphQLFloat } from 'graphql'
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
        price : {type : GraphQLFloat },
        discount : {type : GraphQLFloat },
        time : {type : GraphQLInt },
        status : {type : GraphQLString},
        teacher : {type : userType },
        chapters : {type : new GraphQLList(chapterType) },
        students : {type : new GraphQLList(GraphQLString) },
        likesCount : { type : GraphQLInt },
        _id : {type : GraphQLString},
        imageURL : {type : GraphQLString}
    }
})

export default courseType