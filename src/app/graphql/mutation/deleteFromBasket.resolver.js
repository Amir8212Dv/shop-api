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




class DeleteFromBasketMutation {
    decreaseProduct = {
        type: createResponseType(),
        args: {
            productId: { type: GraphQLString },
            count: { type: GraphQLInt },
        },
        resolve: async (obj, args, context, info) => {
            await verifyAccessTokenGraphQL(context.req);
            const { productId } = args;
            const basketId = context.req.user.basket;
            await validateObjectId.validateAsync(productId);

            const basket = await basketModel.findOne(
                { _id: basketId, "products.productId": productId },
                { "products.$": 1 }
            );


            const productPrice = user.basket.products[0].price

            if (basket.products[0].count <= 1) {
                await basketModel.updateOne(
                    { _id: basketId, "products.productId": productId },
                    { $pull: { products: { productId } } , $inc : {totalPrice : -productPrice} }
                );
            } else
                await basketModel.updateOne(
                    { _id: basketId, "products.productId": productId },
                    { $inc: { "products.$.count": -1 , totalPrice: -productPrice } }
                );

            return {
                status: httpStatus.CREATED,
                message: "product bookmarke delete successfully",
                data : {}
            };
        },
    };

    deleteProduct = {
        type: createResponseType(),
        args: {
            productId: { type: GraphQLString },
        },
        resolve: async (obj, args, context, info) => {
            await verifyAccessTokenGraphQL(context.req);
            const { productId } = args;
            const basketId = context.req.user.basket;
            await validateObjectId.validateAsync(productId);

            const basket = await basketModel.findOne(
                { _id: basketId, "products.productId": productId },
                { "products.$": 1 }
            );

            const productsTotalPrice = basket.products[0].price * basket.products[0].count


            await basketModel.updateOne(
                { _id: basketId, "products.productId": productId },
                { $pull: { "products": { productId } } , $inc : {totalPrice: -productsTotalPrice} }
            );

            return {
                status: httpStatus.CREATED,
                message: "product bookmarke delete successfully",
                data : {}
            };
        },
    };

    deleteCourse = {
        type: createResponseType(),
        args: {
            courseId: { type: GraphQLString },
        },
        resolve: async (obj, args, context, info) => {
            await verifyAccessTokenGraphQL(context.req);
            const { courseId } = args;
            const basketId = context.req.user.basket;
            await validateObjectId.validateAsync(courseId);

            const basket = await basketModel.findOne(
                { _id: basketId, "courses.courseId": courseId },
                { "courses.$": 1 }
            );
            const coursesTotalPrice = basket.courses[0].price

            await basketModel.updateOne(
                { _id: basketId,  courseId },
                { $pull: { "courses": { courseId } }, $inc : {totalPrice: -coursesTotalPrice} }
            );

            return {
                status: httpStatus.CREATED,
                message: "course bookmakre delete successfully",
                data : {}
            };
        },
    };
}

export default new DeleteFromBasketMutation();
