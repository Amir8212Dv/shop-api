import {GraphQLObjectType , GraphQLString , GraphQLList} from 'graphql'
import anyType from './any.type.js'

export const categoryType = new GraphQLObjectType({
    name : 'categoryType',
    fields : {
        _id : {type : GraphQLString},
        title : {type : GraphQLString}
    }
})


export const nestedCategoryType = new GraphQLObjectType({
    name : 'categoryWithChildrenType',
    fields : {
        _id : {type : GraphQLString},
        title : {type : GraphQLString},
        children : {type : new GraphQLList(anyType)}
    }
})
