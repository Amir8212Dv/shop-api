import {GraphQLString , GraphQLObjectType , GraphQLList , GraphQLInt} from 'graphql'
import userType from './user.type.js'



const blogType = new GraphQLObjectType({
    name : 'blogType',
    fields : {
        author : {type : userType},
        title : {type : GraphQLString}, 
        text : {type : GraphQLString},
        short_text : {type : GraphQLString},
        tags : {type : new GraphQLList(GraphQLString)},
        image : {type : GraphQLString},
        category : {type : GraphQLString},
        bookmarksCount : { type : GraphQLInt },
        likesCount : { type : GraphQLInt }
    }
})

export default blogType