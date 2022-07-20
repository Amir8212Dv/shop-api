import createHttpError from "http-errors"
import httpStatus from 'http-status-codes'
import categoryModel from "../../../models/categories.js"
import { createNotFoundError } from "../../../utils/createError.js"
import { createCategoryValidationSchema , updateCategoryValidationSchema } from "../../../validators/admin/category.js"
import validateObjectId from "../../../validators/objectId.js"


class categoryController {
    async addCategory(req , res , next) {
        try {
            createCategoryValidationSchema.validate(req.body)
            const {title , parent} = req.body


            const category = await categoryModel.create({title , parent})
            if(!category) throw createHttpError.InternalServerError()

            res.status(httpStatus.CREATED).send({
                status : httpStatus.CREATED,
                message : 'category created successfully',
                data : {
                    category : [
                        category
                    ]
                }
            })

        } catch (error) {
            next(error)
        }
    }
    async removCategory(req , res , next) {
        try {
            const {categoryId} = req.params
            await validateObjectId.validateAsync(categoryId)

            const category = await categoryModel.findByIdAndDelete(categoryId)
            createNotFoundError({category})

            const subCategories = await categoryModel.deleteMany({parent : categoryId})


            res.status(httpStatus.OK).send({
                status: httpStatus.OK,
                message : 'category and all sub categories deleted successfully',
                data : { }
            })
            
        } catch (error) {
            next(error)
        }
    }
    async editCategory(req , res , next) {
        try {
            const {categoryId} = req.params

            const {title} = req.body
            updateCategoryValidationSchema.validate(req.body)

            const category = await categoryModel.findByIdAndUpdate(categoryId , {title} , {returnDocument : 'after'})
            createNotFoundError({category})

            res.status(httpStatus.CREATED).send({
                status : httpStatus.CREATED,
                message : 'category updated successfully',
                data : {
                    category : [
                        category
                    ]
                }
            })
            
        } catch (error) {
            next(error)
        }
    }
    // async getAllCategory(req , res , next) {
    //     try {


    //         const categories = await categoryModel.find({parent : undefined})

    //         res.status(httpStatus.OK).send({
    //             status : httpStatus.OK,
    //             message : '',
    //             data : {
    //                 category : categories
    //             }
    //         })
            
    //     } catch (error) {
    //         next(error)
    //     }
    // }
    // async getCategoryById(req , res , next) {
    //     try {
    //         // const categoryId = mongoose.Types.ObjectId(req.params.id)
    //         const {categoryId} = req.params

    //         const category = await categoryModel.findById(categoryId)

    //         if(!category) throw createHttpError.NotFound('category not found')

    //         res.status(httpStatus.OK).send({
    //             status : httpStatus.OK,
    //             message : '',
    //             data : {
    //                 category : [
    //                     category
    //                 ]
    //             }
    //         })
            
    //     } catch (error) {
    //         next(error)
    //     }
    // }
    // async getHeadCategories(req , res , next) {
    //     try {
    //         const categories = await categoryModel.aggregate([
    //             {
    //                 $match : {parent : undefined}
    //             }
    //         ])

    //         res.status(httpStatus.OK).send({
    //             status : httpStatus.OK,
    //             message : '',
    //             data : {
    //                 category : categories
    //             }
    //         })
    //     } catch (error) {
    //         next(error)
    //     }
    // }
    // async getSubCategories(req , res, next) {
    //     try {
    //         const {parentId} = req.params
    //         const categories = await categoryModel.find({parent : parentId})

    //         res.send({
    //             status : 200,
    //             message : '',
    //             data : {
    //                 category : categories
    //             }
    //         })
    //     } catch (error) {
    //         next(error)
    //     }
    // }

}

export default new categoryController()