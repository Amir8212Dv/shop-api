import { verifyAccessTokenGraphQL } from "../../middlewares/verifyAccessToken.js";
import validateObjectId from "../../validators/objectId.js";
import mongoose from 'mongoose'
import httpStatus from 'http-status-codes'
import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import basketType from "../types/basket.type.js";
import basketModel from "../../models/basket.js";


const responseType = new GraphQLObjectType({
    name : 'basketResponseType',
    fields : {
        status : {type : GraphQLInt},
        message : {type : GraphQLString},
        data : {type : new GraphQLObjectType({
            name : 'basketDataResponseType',
            fields : {
                basket : {type : basketType}
            }
        })}
    }
})

class BasketQuery {
    getBasket = {
        type : responseType,
        resolve : async (obj , args , context , info) => {
            await verifyAccessTokenGraphQL(context.req)
            const {courseId} = args
            const basketId = mongoose.Types.ObjectId(context.req.user.basket)
            await validateObjectId.validateAsync(courseId)
    
    
            const [basket] = await basketModel.aggregate([
                {$match : {_id : basketId}},
                {
                    $lookup : {
                        from : 'products',
                        localField : 'products.productId',
                        foreignField : '_id',
                        as : 'productDetails'
                    }
                },
                {
                    $lookup : {
                        from : 'courses',
                        localField : 'courses.courseId',
                        foreignField : '_id',
                        as : 'courseDetails'
                    }
                },
                {
                    $sort : {
                        createdAt : 1
                    }
                }
            ])
            return {
                status : httpStatus.OK,
                message : '',
                data : {
                    basket
                }
            }
        }
        
    }

}

export default new BasketQuery()