import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql"


const responseType = new GraphQLObjectType({
    name : 'emptyResponseType',
    fields : {
        status : {type : GraphQLInt},
        message : {type : GraphQLString}
    }
})

export default responseType
