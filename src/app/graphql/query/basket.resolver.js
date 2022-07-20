import { verifyAccessTokenGraphQL } from "../../middlewares/verifyAccessToken.js";
import userModel from "../../models/users.js";
import validateObjectId from "../../validators/objectId.js";
import anyType from "../types/any.type.js";
import mongoose from 'mongoose'
import httpStatus from 'http-status-codes'
import createResponseType from "../types/responseType.js";
import { GraphQLList, GraphQLObjectType } from "graphql";

const responseType = {
    baskets : {type : new GraphQLList(anyType)}
}

class basketResolver {
    getBasket = {
        type : createResponseType(responseType),
        resolve : async (obj , args , context , info) => {
            await verifyAccessTokenGraphQL(context.req)
            const {courseId} = args
            const userId = mongoose.Types.ObjectId(context.req.user._id)
            await validateObjectId.validateAsync(courseId)
    
    
            const userBasket = await userModel.aggregate([
                {$match : {_id : userId}},
                {
                    $lookup : {
                        from : 'products',
                        localField : 'basket.products.productId',
                        foreignField : '_id',
                        as : 'basket.productDetails'
                    }
                },
                {
                    $lookup : {
                        from : 'courses',
                        localField : 'basket.courses.courseId',
                        foreignField : '_id',
                        as : 'basket.courseDetails'
                    }
                }
            ])
            return {
                status : httpStatus.OK,
                message : '',
                data : {
                    basket : userBasket.basket
                }
            }
        }
        
    }

}

export default new basketResolver()