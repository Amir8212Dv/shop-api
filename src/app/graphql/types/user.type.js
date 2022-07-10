import {GraphQLString , GraphQLObjectType} from 'graphql'


const userType = new GraphQLObjectType({
    name : 'userType',
    fields : {
        title : {type : GraphQLString},
        first_name : {type : GraphQLString}, 
        last_name : {type : GraphQLString},
        _id : {type : GraphQLString},
    }
})

export default userType