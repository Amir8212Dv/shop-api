import { GraphQLString } from "graphql";
import createHttpError from "http-errors";
import { verifyAccessTokenGraphQL } from "../../middlewares/verifyAccessToken.js";
import validateObjectId from "../../validators/objectId.js";
import httpStatus from "http-status-codes";
import courseModel from "../../models/courses.js";
import productModel from "../../models/products.js";
import userModel from "../../models/users.js";
import responseType from "../types/responseType.js";
import basketModel from "../../models/basket.js";

class AddToBasketMutation {
    addProduct = {
        type: responseType,
        args: {
            productId: { type: GraphQLString },
        },
        resolve: async (obj, args, context, info) => {
            await verifyAccessTokenGraphQL(context.req);
            const { productId } = args;
            const basketId = context.req.user.basket;
            await validateObjectId.validateAsync(productId);

            const product = await productModel.findById(productId, {
                price: 1,
                discount: 1,
            });
            const productFinalPrice = product.price - product.discount;

            const basket = await basketModel.findOne(
                { _id: basketId, "products.productId": productId },
                { "products.$": 1 }
            );

            if (!basket)
                await basketModel.updateOne(
                    { _id: basketId },
                    {
                        $push: {
                            products: {
                                productId,
                                count: 1,
                                price: productFinalPrice,
                            },
                        },
                        $inc : {totalPrice: productFinalPrice} ,
                    }
                );
            else
                await basketModel.updateOne(
                    { _id: basketId , "products.productId" : productId },
                    {
                        $inc: {
                            "products.$.count": 1,
                            totalPrice: productFinalPrice,
                        },
                    }
                );

            return {
                status: httpStatus.CREATED,
                message: "product added to basket successfully",
                data : {}
            };
        },
    };

    addCourse = {
        type: responseType,
        args: {
            courseId: { type: GraphQLString },
        },
        resolve: async (obj, args, context, info) => {
            await verifyAccessTokenGraphQL(context.req);
            const { courseId } = args;
            const user = context.req.user
            const userId = user._id
            const basketId = user.basket;
            await validateObjectId.validateAsync(courseId);
            
            const course = await courseModel.findById(courseId, {
                price: 1,
                discount: 1,
            });
            const courseFinalPrice = course.price - course.discount;
            
            if(courseFinalPrice <= 0) await userModel.updateOne({_id : userId} , {$push : {courses : courseId}})
            else {

                const basket = await basketModel.findOne({_id : basketId , "courses.courseId": courseId})
                
                if (basket || user.courses.includes(course._id)) throw createHttpError.BadRequest('course already taken by users , you cant delete that')
                await basketModel.updateOne(
                    { _id: basketId },
                    {
                        $push: {
                            courses: {
                                courseId,
                                price: courseFinalPrice
                            },
                        },
                        $inc: { totalPrice: courseFinalPrice }
                    }
                    );
                }
                
            
            return {
                status: httpStatus.CREATED,
                message: "course bookmakre delete successfully",
                data : {}
            };
        },
    };
}

export default new AddToBasketMutation();
