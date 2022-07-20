import multer from 'multer'
import path from 'path'
import fs from 'fs'
import blogModel from '../models/blogs.js'
import productImagesName from '../utils/nameForProductImages.js'
import createObjectId from '../utils/createObjectId.js'
import createHttpError from 'http-errors'

const imageUploadSetting = multer.diskStorage({
    destination : (req , file , cb) => {
    try {
        const _id = req.params.id || (req.body._id ? req.body._id : createObjectId())
        if(!req.params.id && !req.body._id) req.body._id = _id
        
        const dirPath = path.join(process.argv[1] , '..' , '..' , 'public' , 'images' , `${req.baseUrl === '/admin/product' ? _id.toString() : ''}`)
        fs.mkdirSync(dirPath , {recursive : true})
        
        if(req.params.id) {
            const numberOfImages = fs.readdirSync(dirPath)
            if(numberOfImages.length >= 10) throw createHttpError.Unauthorized('images cant be more than 10')
            if(!req.imageNames) req.imageNames = numberOfImages
        }

        req.filePath = dirPath
        cb(null , dirPath)

    } catch (error) {
        cb(error)
    }
    },
    filename : (req , file , cb) => {
        try {
            const _id = req.params.id || req.body._id

            if(req.baseUrl === '/admin/product') {       // for create image Names
                if (!req.imageNames) req.imageNames = [1]
                else req.imageNames.push(1)
            }

            const imageName = req.baseUrl === '/admin/product' ? req.imageNames.length : _id.toString()
            cb(null , `${imageName}.${file.mimetype.split('/')[1]}`)

        } catch (error) {
            cb(error)
        }
    }
})






const videoUploadSetting = multer.diskStorage({
    destination : (req , file , cb) => {
    try {
        const _id =  createObjectId()
        if(!req.body._id) req.body._id = _id
        
        const dirPath = path.join(process.argv[1] , '..' , '..' , 'public' , 'video')
        fs.mkdirSync(dirPath , {recursive : true})

        cb(null , dirPath)

    } catch (error) {
        cb(error)
    }
    },
    filename : (req , file , cb) => {
        try {
            const _id = req.body._id
            cb(null , `${_id.toString()}.${file.mimetype.split('/')[1]}`)

        } catch (error) {
            cb(error)
        }
    }
})




export const imageUpload = multer({storage : imageUploadSetting , limits : {fileSize : 1024 * 1024 * 2} , fileFilter : async (req , file , cb) => {
    const fileType = file.mimetype.split('/')[0]
    const fileExtension = file.mimetype.split('/')[1]
    console.log(fileType.toLowerCase())
    if(fileType.toLowerCase() !== 'image' || !(['png' , 'jpg' , 'jpeg' , 'webp' , 'gif' , 'mp4'].includes(fileExtension.toLowerCase()))) {
        return cb(new Error('uploded file type is not supported'))
    }
    cb(null , true)
}})

export const videoUpload = multer({storage : videoUploadSetting , limits : {fileSize : 1024 * 1024 * 500}, fileFilter : async (req , file , cb) => {
    const fileType = file.mimetype.split('/')[0]
    const fileExtension = file.mimetype.split('/')[1]
    console.log(fileType.toLowerCase())
    if(fileType.toLowerCase() !== 'video' || !(['mp4' , 'mov' , 'mpg' , 'avi' , 'mkv'].includes(fileExtension.toLowerCase()))) {
        return cb(new Error('uploded file type is not supported'))
    }
    cb(null , true)
}})

