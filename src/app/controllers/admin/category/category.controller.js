import createHttpError from "http-errors"
import httpStatus from 'http-status-codes'
import categoryModel from "../../../models/categories.js"
import { createCategoryValidationSchema , updateCategoryValidationSchema } from "../../../validators/admin/category.js"



// change all queries into a sing method (aggregate / find & populate)



class categoryController {
    async addCategory(req , res , next) {
        try {
            createCategoryValidationSchema.validate(req.body)
            const {title , parent} = req.body
            
            if(parent){
                const parentCategory = await categoryModel.findById(parent)
                if(!parentCategory) throw createHttpError.BadRequest('parent category not find')
            }


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
            const categoryId = req.params.id 

            const removedCategory = await categoryModel.findByIdAndDelete(categoryId)
            if(!removedCategory) throw createHttpError.BadRequest('category not found')

            const subCategories = await categoryModel.find({parent : categoryId})
            // subCategories.forEach(async item => {
            // })
            
            for(const item in subCategories) {
                await categoryModel.deleteOne({_id : item._id})
                await categoryModel.deleteMany({parent : item._id})
            }

            res.status(httpStatus.OK).send({
                status: httpStatus.OK,
                message : 'category deleted successfully',
                data : {
                    category : [
                        removedCategory
                    ]
                }
            })
            
        } catch (error) {
            next(error)
        }
    }
    async editCategory(req , res , next) {
        try {
            const categoryId = req.params.id

            const {title} = req.body
            updateCategoryValidationSchema.validate(req.body)

            const category = await categoryModel.findByIdAndUpdate(categoryId , {title} , {returnDocument : 'after'})
            if(!category) throw {message : 'category not found'}

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
    async getAllCategory(req , res , next) {
        try {


            const categories = await categoryModel.find({parent : undefined})

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : '',
                data : {
                    categories
                }
            })
            
        } catch (error) {
            next(error)
        }
    }
    async getCategoryById(req , res , next) {
        try {
            // const categoryId = mongoose.Types.ObjectId(req.params.id)
            const categoryId = req.params.id 

            const category = await categoryModel.findById(categoryId)

            if(!category) throw createHttpError.BadRequest('category not found')

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : '',
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
    async getHeadCategories(req , res , next) {
        try {
            const categories = await categoryModel.aggregate([
                {
                    $match : {parent : undefined}
                }
            ])

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : '',
                data : {
                    categories
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getSubCategories(req , res, next) {
        try {
            
            const categories = await categoryModel.find({parent : req.params.parentId})

            res.send({
                status : 200,
                message : '',
                data : {
                    categories
                }
            })
        } catch (error) {
            next(error)
        }
    }

}

export default new categoryController()