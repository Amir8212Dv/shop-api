import { GraphQLString , GraphQLObjectType , GraphQLBoolean } from 'graphql'
import userType from './user.type.js'

const commentType = new GraphQLObjectType({
    name : 'commentType',
    fields : {
        author : {type : userType},
        comment : {type : GraphQLString},
        parent : {type : GraphQLString},
        show : {type : GraphQLBoolean}
    }
})

export default commentType