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
import basketModel from "../../models/basket.js";

class AddToBasketMutation {
    addProduct = {
        type: createResponseType(),
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
                await userModel.updateOne(
                    { _id: userId, "basket.products.productId": productId },
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
        type: createResponseType(),
        args: {
            courseId: { type: GraphQLString },
        },
        resolve: async (obj, args, context, info) => {
            await verifyAccessTokenGraphQL(context.req);
            const { courseId } = args;
            const basketId = context.req.user.basket;
            await validateObjectId.validateAsync(courseId);

            const course = await courseModel.findById(courseId, {
                price: 1,
                discount: 1,
            });
            const courseFinalPrice = course.price - course.discount;

            const basket = await basketModel.findOne(
                { $and : [
                    {_id : basketId} , {
                        $or : [
                            {"courses.courseId": courseId} , 
                            {courses : courseId}
                        ]
                    }
                ]}
            );

            if (basket) throw createHttpError.BadRequest('course already taken')
            
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
            
            return {
                status: httpStatus.CREATED,
                message: "course bookmakre delete successfully",
                data : {}
            };
        },
    };
}

export default new AddToBasketMutation();
