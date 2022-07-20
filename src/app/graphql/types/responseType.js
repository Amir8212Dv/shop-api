import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql"

const emptyDataType = new GraphQLObjectType({name : 'emptyObject'})

const responseType = new GraphQLObjectType({
    name : 'responseType',
    fields : {
        status : {type : GraphQLInt},
        message : {type : GraphQLString},
        // data : dataType
    }
})
const createResponseType = (dataType = emptyDataType) => {
    responseType.toConfig().fields.data = dataType
    return responseType
}

export default createResponseType