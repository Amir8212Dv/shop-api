import createHttpError from "http-errors"
import mongoose from "mongoose"
import categoryModel from "../../models/categories.js"
import { createCategorySchema , updateCategorySchema } from "../../validators/admin/category.js"



// add restriction in add category for sub depth

// .aggregate([
//                 {
//                     $match : {parent : undefined}
//                 },
//                 {
//                     $graphLookup : {
//                         from : 'categories',
//                         startWith : '$_id',
//                         connectFromField : '_id',
//                         connectToField : 'parent',
//                         maxDepth : 3,
//                         depthField : 'depth',
//                         as : 'children'
//                     }
//                 },
//                 {
//                     $project : {
//                         __v : 0,
//                         'children.__v' : 0
//                     }
//                 }
//             ])

class categoryController {
    async addCategory(req , res , next) {
        try {
            createCategorySchema.validate(req.body)
            const {title , parent} = req.body
            
            if(parent){
                const parentCategory = await categoryModel.findById(parent)
                if(!parentCategory) throw createHttpError.BadRequest('parent category not find')
            }

            const category = await categoryModel.create({title , parent})
            if(!category) throw createHttpError.InternalServerError()

            res.status(201).send({
                status : 201,
                success : true,
                data : {
                    category
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

            res.send({
                status: 200,
                message : 'category deleted successfully',
                category : removedCategory
            })
            
        } catch (error) {
            next(error)
        }
    }
    async editCategory(req , res , next) {
        try {
            const categoryId = req.params.id

            const {title} = req.body
            updateCategorySchema.validate(req.body)

            const category = await categoryModel.findByIdAndUpdate(categoryId , {title} , {returnDocument : 'after'})
            if(!category) throw {message : 'category not found'}

            res.status(201).sedn({
                status : 201,
                message : 'category updated successfully',
                category
            })
            
        } catch (error) {
            next(error)
        }
    }
    async getAllCategory(req , res , next) {
        try {


            const categories = await categoryModel.find({parent : undefined})

            res.send({
                status : 200,
                categories
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


            // const category = await categoryModel.aggregate([
            //     {
            //         $match : {_id : categoryId}
            //     },
            //     {
            //         $lookup : {
            //             from : 'categories',
            //             localField : '_id',
            //             foreignField : 'parent',
            //             as : 'children'
            //         }
            //     },
            //     {
            //         $project : {
            //             __v : 0,
            //             'children.__v' : 0
            //         }
            //     }
            // ])
            if(!category) throw createHttpError.BadRequest('category not found')

            res.send({
                status : 200,
                category
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

            res.send({
                status : 200,
                categories
            })
        } catch (error) {
            next(error)
        }
    }
    async getSubCategories(req , res, next) {
        try {
            
            const categories = await categoryModel.find({parent : req.params.parentId})
            // .aggregate([
            //     {
            //         $match : {
            //             $not : {parent : undefined}
            //         }
            //     },
            //     {
            //         $lookup : {
            //             from : 'categories',
            //             localField : 'parent',
            //             foreignField : '_id',
            //             as : 'parent'
            //         }
            //     },
            //     {
            //         $project : {
            //             __v : 0,
            //             'parent.__v' : 0
            //         }
            //     }
            // ])

            res.send({
                status : 200,
                categories
            })
        } catch (error) {
            next(error)
        }
    }

}

export default new categoryController()