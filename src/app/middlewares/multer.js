import multer from 'multer'
import path from 'path'
import fs from 'fs'
import blogModel from '../models/blogs.js'

const uploadFile = multer.diskStorage({
    destination : (req , file , cb) => {
        fs.mkdirSync(path.join(process.argv[1] , '..' , '..' , 'public' , 'images') , {recursive : true})
        cb(null , path.join(process.argv[1] , '..' , '..'  , 'public' , 'images'))
    },
    filename : (req , file , cb) => {
        const imageName = req.baseUrl === '/admin/blog' ? req.params.id : ''
        cb(null , `${imageName}.${file.mimetype.split('/')[1]}`)
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