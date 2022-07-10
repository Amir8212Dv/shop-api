import graphqlSchema from "./index.graphql.js";

function graphqlConfig (req , res) {
    return {
        schema : graphqlSchema,
        graphiql : true,
        context : {req , res}
    }
}

export default graphqlConfig