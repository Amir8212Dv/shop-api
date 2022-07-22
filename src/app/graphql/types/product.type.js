import {GraphQLObjectType , GraphQLString , GraphQLInt , GraphQLList} from 'graphql'
import {categoryType} from './category.type.js'
import userType from './user.type.js'
import commentType from './comment.type.js'

const featuresType = new GraphQLObjectType({
    name : 'featuresType',
    fields : {
        length : {type : GraphQLInt},
        width : {type : GraphQLInt},
        height : {type : GraphQLInt},
        weight : {type : GraphQLInt},
        model : {type : GraphQLString},
        madein :{type : GraphQLString}
    }
})

const productType = new GraphQLObjectType({
    name : 'productType',
    fields : {
        title      : { type : GraphQLString },
        text       : { type : GraphQLString },
        short_text : { type : GraphQLString },
        images     : { type : new GraphQLList(GraphQLString) },
        tags       : { type : new GraphQLList(GraphQLString) },
        category   : { type : categoryType },
        comments   : { type : new GraphQLList(commentType)  },
        likes      : { type : new GraphQLList(GraphQLString) },
        bookemarks : { type : new GraphQLList(GraphQLString) },
        price      : { type : GraphQLInt },
        discount   : { type : GraphQLInt },
        count      : { type : GraphQLInt },
        suplier    : { type : userType },
        features   : { type : featuresType },
        bookmarksCount : { type : GraphQLInt },
        likesCount : { type : GraphQLInt }
    }
})

export default productType