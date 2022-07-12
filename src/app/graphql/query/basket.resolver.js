import { verifyAccessTokenGraphQL } from "../../middlewares/verifyAccessToken.js";
import userModel from "../../models/users.js";
import validateObjectId from "../../validators/objectId.js";
import anyType from "../types/any.type.js";

const getBasket = {
    type : anyType,
    resolve : async (obj , args , context , info) => {
        await verifyAccessTokenGraphQL(context.req)
        const {courseId} = args
        const userId = context.req.user._id
        await validateObjectId.validateAsync(courseId)


        const user = await userModel.findById(userId)
        return user
    }
    
}

export default getBasket