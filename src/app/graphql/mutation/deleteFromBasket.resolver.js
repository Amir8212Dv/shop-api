import { GraphQLString, GraphQLInt } from "graphql";
import createHttpError from "http-errors";
import { verifyAccessTokenGraphQL } from "../../middlewares/verifyAccessToken.js";
import validateObjectId from "../../validators/objectId.js";
import httpStatus from "http-status-codes";
import { responseType } from "./createComment.resolver.js";
import courseModel from "../../models/courses.js";
import blogModel from "../../models/blogs.js";
import productModel from "../../models/products.js";
import userModel from "../../models/users.js";



// update user basket when products and courses updated


class deleteFromBasket {
    decreaseProduct = {
        type: responseType,
        args: {
            productId: { type: GraphQLString },
            count: { type: GraphQLInt },
        },
        resolve: async (obj, args, context, info) => {
            await verifyAccessTokenGraphQL(context.req);
            const { productId } = args;
            const userId = context.req.user._id;
            await validateObjectId.validateAsync(productId);

            const user = await userModel.findOne(
                { _id: userId, "basket.products.productId": productId },
                { "basket.products.$": 1 }
            );


            const productPrice = user.basket.products[0].price

            if (user.basket.products[0].count <= 1) {
                await userModel.updateOne(
                    { _id: userId, "basket.products.productId": productId },
                    { $pull: { "basket.products": { productId: productId } } , $inc : {'basket.totalPrice' : -productPrice} }
                );
            } else
                await userModel.updateOne(
                    { _id: userId, "basket.products.productId": productId },
                    { $inc: { "basket.products.$.count": -1 , "basket.totalPrice": -productPrice } }
                );

            return {
                status: httpStatus.CREATED,
                message: "product bookmarke delete successfully",
            };
        },
    };

    decreaseCourse = {
        type: responseType,
        args: {
            courseId: { type: GraphQLString },
            count: { type: GraphQLInt },
        },
        resolve: async (obj, args, context, info) => {
            await verifyAccessTokenGraphQL(context.req);
            const { courseId } = args;
            const userId = context.req.user._id;
            await validateObjectId.validateAsync(courseId);

            const user = await userModel.findOne(
                { _id: userId, "basket.courses.courseId": courseId },
                { "basket.courses.$": 1 }
            );


            const coursePrice = user.basket.courses[0].price

            if (user.basket.courses[0].count <= 1) {
                await userModel.updateOne(
                    { _id: userId, "basket.courses.courseId": courseId },
                    { $pull: { "basket.courses": { courseId: courseId } } , $inc : {"basket.totalPrice": -coursePrice} }
                );
            } else
                await userModel.updateOne(
                    { _id: userId, "basket.courses.courseId": courseId },
                    { $inc: { "basket.courses.$.count": -1 , "basket.totalPrice": -coursePrice } }
                );

            return {
                status: httpStatus.CREATED,
                message: "course bookmakre delete successfully",
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
            const userId = context.req.user._id;
            await validateObjectId.validateAsync(productId);

            const user = await userModel.findOne(
                { _id: userId, "basket.products.productId": productId },
                { "basket.products.$": 1 }
            );

            const productsTotalPrice = user.basket.products[0].price * user.basket.products[0].count


            await userModel.updateOne(
                { _id: userId, "basket.products.productId": productId },
                { $pull: { "basket.products": { productId: productId } } , $inc : {"basket.totalPrice": -productsTotalPrice} }
            );

            return {
                status: httpStatus.CREATED,
                message: "product bookmarke delete successfully",
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
            const userId = context.req.user._id;
            await validateObjectId.validateAsync(courseId);

            const user = await userModel.findOne(
                { _id: userId, "basket.courses.courseId": courseId },
                { "basket.courses.$": 1 }
            );
            const coursesTotalPrice = user.basket.courses[0].price * user.basket.courses[0].count

            await userModel.updateOne(
                { _id: userId, "basket.courseId": courseId },
                { $pull: { "basket.courses": { courseId: courseId } }, $inc : {"basket.totalPrice": -coursesTotalPrice} }
            );

            return {
                status: httpStatus.CREATED,
                message: "course bookmakre delete successfully",
            };
        },
    };
}

export default new deleteFromBasket();
