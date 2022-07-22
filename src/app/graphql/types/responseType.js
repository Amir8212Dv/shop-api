import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql"

// const emptyDataType = new GraphQLObjectType({name : 'emptyObject'})

const responseData = {}

const responseType = new GraphQLObjectType({
    name : 'responseType',
    fields : {
        status : {type : GraphQLInt},
        message : {type : GraphQLString},
        data : {type : new GraphQLObjectType({
            name : 'responseDataType',
            fields : responseData
        })}
    }
})
const createResponseType = (dataType = {}) => {
    Object.assign(responseData , dataType)
    return responseType
}

export default createResponseType
