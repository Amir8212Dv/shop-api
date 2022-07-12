import { verifyAccessTokenGraphQL } from "../../middlewares/verifyAccessToken.js";
import userModel from "../../models/users.js";
import validateObjectId from "../../validators/objectId.js";
import anyType from "../types/any.type.js";
import mongoose from 'mongoose'

const getBasket = {
    type : anyType,
    resolve : async (obj , args , context , info) => {
        await verifyAccessTokenGraphQL(context.req)
        const {courseId} = args
        const userId = mongoose.Types.ObjectId(context.req.user._id)
        await validateObjectId.validateAsync(courseId)


        const user = await userModel.aggregate([
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
        return user
    }
    
}

export default getBasket