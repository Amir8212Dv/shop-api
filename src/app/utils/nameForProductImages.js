import fs from 'fs'
import createHttpError from 'http-errors'
import path from 'path'

const productImagesName = id => {
    const dirPath = path.join(process.argv[1] , '..', '..' , 'public' , 'images' , '62c0a341db0ebf2d03eebf91')
    const checkForFile = fs.existsSync(dirPath)
    if(!checkForFile) {
        return 1
    }

    const imagesName = fs.readdirSync(dirPath)
    
    if(!!imagesName.length){
        if(imagesName.length === 10) throw createHttpError.BadRequest('each product cant have more than 10 images')
        return Math.max(...imagesName.map(name => +(name.split('.')[0]))) + 1
    } else {
        return 1
    }

}

export default productImagesName