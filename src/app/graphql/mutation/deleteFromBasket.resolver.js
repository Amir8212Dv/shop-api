import { GraphQLString, GraphQLInt } from "graphql";
import { verifyAccessTokenGraphQL } from "../../middlewares/verifyAccessToken.js";
import validateObjectId from "../../validators/objectId.js";
import httpStatus from "http-status-codes";
import responseType from "../types/responseType.js";
import basketModel from "../../models/basket.js";
import { createInternalServerError, createNotFoundError } from "../../utils/createError.js";




class DeleteFromBasketMutation {
    decreaseProduct = {
        type: responseType,
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
            createNotFoundError({basket})


            const productPrice = basket.products[0].price

            if (basket.products[0].count <= 1) {
                const updateBasket = await basketModel.updateOne(
                    { _id: basketId, "products.productId": productId },
                    { $pull: { products: { productId } } , $inc : {totalPrice : -productPrice} }
                );
                createInternalServerError(updateBasket.modifiedCount)
            } else {
                const updateBasket = await basketModel.updateOne(
                    { _id: basketId, "products.productId": productId },
                    { $inc: { "products.$.count": -1 , totalPrice: -productPrice } }
                );
                createInternalServerError(updateBasket.modifiedCount)
            }
            return {
                status: httpStatus.CREATED,
                message: "product decreased by one in basket successfully",
                data : {}
            };
        },
    };

    deleteProduct = {
        type: responseType,
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
            createNotFoundError({basket})

            const productsTotalPrice = basket.products[0].price * basket.products[0].count


            const updateBasket = await basketModel.updateOne(
                { _id: basketId, "products.productId": productId },
                { $pull: { "products": { productId } } , $inc : {totalPrice: -productsTotalPrice} }
            );
            createInternalServerError(updateBasket.modifiedCount)


            return {
                status: httpStatus.CREATED,
                message: "product deleted from basket successfully",
                data : {}
            };
        },
    };

    deleteCourse = {
        type: responseType,
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
            createNotFoundError({basket})
            const coursesTotalPrice = basket.courses[0].price

            const updateBasket = await basketModel.updateOne(
                { _id: basketId,  courseId },
                { $pull: { "courses": { courseId } }, $inc : {totalPrice: -coursesTotalPrice} }
            );
            createInternalServerError(updateBasket.modifiedCount)

            return {
                status: httpStatus.CREATED,
                message: "course deleted from basket successfully",
                data : {}
            };
        },
    };
}

export default new DeleteFromBasketMutation();
