import httpStatus from 'http-status-codes'
import categoryModel from "../../../models/categories.js"
import { createInternalServerError, createNotFoundError } from "../../../utils/createError.js"
import { createCategoryValidationSchema , updateCategoryValidationSchema } from "../../../validators/admin/category.js"
import validateObjectId from "../../../validators/objectId.js"


class CategoryController {
    async createCategory(req , res , next) {
        try {
            createCategoryValidationSchema.validate(req.body)
            const {title , parent} = req.body

            const category = await categoryModel.create({title , parent})
            createInternalServerError(category)

            res.status(httpStatus.CREATED).send({
                status : httpStatus.CREATED,
                message : 'category created successfully',
                data : {
                    category
                }
            })

        } catch (error) {
            next(error)
        }
    }
    async deleteCategory(req , res , next) {
        try {
            const {categoryId} = req.params
            await validateObjectId.validateAsync(categoryId)
            const category = await categoryModel.deleteOne({_id : categoryId})
            createNotFoundError({category})
            createInternalServerError(category.deletedCount)
            const deleteSubCategories = await categoryModel.deleteMany({parent : categoryId})


            res.status(httpStatus.OK).send({
                status: httpStatus.OK,
                message : 'category and all sub categories deleted successfully',
                data : {}
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

            const category = await categoryModel.updateOne({_id : categoryId} , {title})
            createNotFoundError({category})
            createInternalServerError(category.modifiedCount)

            res.status(httpStatus.CREATED).send({
                status : httpStatus.CREATED,
                message : 'category updated successfully',
                data : {}
            })
            
        } catch (error) {
            next(error)
        }
    }
}

export default new CategoryController()