import courseType from "../types/course.type.js";
import courseModel from '../../models/courses.js'
import { GraphQLList,GraphQLString } from 'graphql'
import createQueryFilter from "../../utils/createQueryFilter.js";

class courseResolver {
    
    getAllCourses = {
        type : new GraphQLList(courseType),
        args : {
            teacher : {type : GraphQLString},
            search : {type : GraphQLString},
            tags : {type : GraphQLString},
            category : {type : GraphQLString},
            status : {type : GraphQLString},
            discount : {type : GraphQLString},
            price : {type : GraphQLString}
        },
        resolve : async (obj , args , context , info) => {
            
            const queryFilter = createQueryFilter(args)
            const courses = await courseModel.find(queryFilter)
            console.log(courses[0].price)
            return courses
        }
    }
}

export default new courseResolver()