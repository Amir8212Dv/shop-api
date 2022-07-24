import {GraphQLString , GraphQLObjectType , GraphQLList , GraphQLInt, GraphQLFloat} from 'graphql'
import { categoryType } from './category.type.js'
import userType from './user.type.js'
import productType from './product.type.js'
import courseType from './course.type.js'

const basketProductType = new GraphQLObjectType({
    name : 'basketProductType',
    fields : {
        productId : {type : GraphQLString},
        count : {type : GraphQLInt},
        price : {type : GraphQLFloat},
        _id : {type : GraphQLString}
    }
})
const basketCourseType = new GraphQLObjectType({
    name : 'basketCourseType',
    fields : {
        courseId : {type : GraphQLString},
        price : {type : GraphQLFloat},
        _id : {type : GraphQLString}
    }
})


const basketType = new GraphQLObjectType({
    name : 'basketType',
    fields : {
        products : {type : new GraphQLList(basketProductType)},
        courses : {type : new GraphQLList(basketCourseType)},
        productDetails : {type : new GraphQLList(productType)},
        courseDetails : {type : new GraphQLList(courseType)},
        totalPrice : {type : GraphQLFloat},
        _id : {type : GraphQLString}
    }
})

export default basketType