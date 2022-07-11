import { GraphQLString , GraphQLObjectType , GraphQLBoolean } from 'graphql'

const commentType = new GraphQLObjectType({
    name : 'commentType',
    fields : {
        author : {type : GraphQLString},
        comment : {type : GraphQLString},
        parent : {type : GraphQLString},
        show : {type : GraphQLBoolean}
    }
})

export default commentType