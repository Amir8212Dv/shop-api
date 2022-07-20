import { GraphQLString, GraphQLInt } from "graphql";
import createHttpError from "http-errors";
import { verifyAccessTokenGraphQL } from "../../middlewares/verifyAccessToken.js";
import validateObjectId from "../../validators/objectId.js";
import httpStatus from "http-status-codes";
import courseModel from "../../models/courses.js";
import blogModel from "../../models/blogs.js";
import productModel from "../../models/products.js";
import userModel from "../../models/users.js";
import createResponseType from "../types/responseType.js";

class addToBasket {
    addProduct = {
        type: createResponseType(),
        args: {
            productId: { type: GraphQLString },
        },
        resolve: async (obj, args, context, info) => {
            await verifyAccessTokenGraphQL(context.req);
            const { productId } = args;
            const userId = context.req.user._id;
            await validateObjectId.validateAsync(productId);

            const product = await productModel.findById(productId, {
                price: 1,
                discount: 1,
            });
            const productFinalPrice = product.price - product.discount;
            console.log(productFinalPrice)

            const user = await userModel.findOne(
                { _id: userId, "basket.products.productId": productId },
                { "basket.products.$": 1 }
            );

            if (!user)
                await userModel.updateOne(
                    { _id: userId },
                    {
                        $push: {
                            "basket.products": {
                                productId,
                                count: 1,
                                price: productFinalPrice,
                            },
                        },
                        $inc : {"basket.totalPrice": productFinalPrice} ,
                    }
                );
            else
                await userModel.updateOne(
                    { _id: userId, "basket.products.productId": productId },
                    {
                        $inc: {
                            "basket.products.$.count": 1,
                            "basket.totalPrice": productFinalPrice,
                        },
                    }
                );

            return {
                status: httpStatus.CREATED,
                message: "product bookmarke delete successfully",
                data : {}
            };
        },
    };

    addCourse = {
        type: createResponseType(),
        args: {
            courseId: { type: GraphQLString },
        },
        resolve: async (obj, args, context, info) => {
            console.log('a')
            await verifyAccessTokenGraphQL(context.req);
            const { courseId } = args;
            const userId = context.req.user._id;
            await validateObjectId.validateAsync(courseId);

            const course = await courseModel.findById(courseId, {
                price: 1,
                discount: 1,
            });
            const courseFinalPrice = course.price - course.discount;

            const user = await userModel.findOne(
                { $and : [
                    {_id : userId} , {$or : [
                        {"basket.courses.courseId": courseId} , 
                        {courses : courseId}
                    ]}
                ]}
            );

            if (user) throw createHttpError.BadRequest('course already taken')
            
            await userModel.updateOne(
                { _id: userId },
                {
                    $push: {
                        "basket.courses": {
                            courseId,
                            price: courseFinalPrice
                        },
                    },
                    $inc: { "basket.totalPrice": courseFinalPrice }
                }
            );
            
            return {
                status: httpStatus.CREATED,
                message: "course bookmakre delete successfully",
                data : {}
            };
        },
    };
}

export default new addToBasket();
