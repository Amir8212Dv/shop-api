import { GraphQLString , GraphQLObjectTyp , GraphQLBoolean } from 'graphql'

const commentType = new GraphQLObjectTyp({
    name : 'commentType',
    fields : {
        author : {type : GraphQLString},
        comment : {type : GraphQLString},
        parent : {type : GraphQLString},
        show : {type : GraphQLBoolean}
    }
})

export default commentType