import { verifyAccessTokenGraphQL } from "../../middlewares/verifyAccessToken.js";
import userModel from "../../models/users.js";
import validateObjectId from "../../validators/objectId.js";
import anyType from "../types/any.type.js";
import mongoose from 'mongoose'
import httpStatus from 'http-status-codes'
import createResponseType from "../types/responseType.js";
import { GraphQLList, GraphQLObjectType } from "graphql";
import basketType from "../types/basket.type.js";
import basketModel from "../../models/basket.js";

const responseType = {
    baskets : {type : basketType}
}

class BasketQuery {
    getBasket = {
        type : createResponseType(responseType),
        resolve : async (obj , args , context , info) => {
            await verifyAccessTokenGraphQL(context.req)
            const {courseId} = args
            const userId = mongoose.Types.ObjectId(context.req.user._id)
            await validateObjectId.validateAsync(courseId)
    
    
            const basket = await basketModel.aggregate([
                {$match : {_id : userId}},
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