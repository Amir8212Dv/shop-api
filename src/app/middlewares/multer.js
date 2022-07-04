import multer from 'multer'
import path from 'path'
import fs from 'fs'
import blogModel from '../models/blogs.js'
import productImagesName from '../utils/nameForProductImages.js'

const uploadFile = multer.diskStorage({
    destination : (req , file , cb) => {
        const dirPath = path.join(process.argv[1] , '..' , '..' , 'public' , 'images' , `${req.baseUrl === '/admin/product' ? req.params.id : ''}`)
        fs.mkdirSync(dirPath , {recursive : true})
        cb(null , dirPath)
    },
    filename : (req , file , cb) => {
        try {
            const imageName = req.baseUrl === '/admin/blog' ? req.params.id
            : req.baseUrl === '/admin/product' && productImagesName(req.params.id)
            cb(null , `${imageName}.${file.mimetype.split('/')[1]}`)
        } catch (error) {
            cb(error)
        }
    }
})

export default multer({storage : uploadFile , limits : {fileSize : 1024 * 1024 * 2} , fileFilter : async (req , file , cb) => {
    const fileType = file.mimetype.split('/')[0]
    const fileExtension = file.mimetype.split('/')[1]
    if(fileType.toLowerCase() !== 'image' || !(['png' , 'jpg' , 'jpeg' , 'webp' , 'gif'].includes(fileExtension.toLowerCase()))) {
        return cb(new Error('uploded file type is not supported'))
    }
    if(req.baseUrl === '/admin/blog') {
        const blog = await blogModel.findById(req.params.id)
        if(!blog) cb(new Error('blog not found'))
    }
    cb(null , true)
}})