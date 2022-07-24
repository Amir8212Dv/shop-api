import {GraphQLString , GraphQLObjectType , GraphQLList , GraphQLInt} from 'graphql'
import { categoryType } from './category.type.js'
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
        _id : {type : GraphQLString},
        category : {type : categoryType},
        likesCount : { type : GraphQLInt },
        imageURL : {type : GraphQLString}
    }
})

export default blogType