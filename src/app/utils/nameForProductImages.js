import fs from 'fs'
import createHttpError from 'http-errors'
import path from 'path'

const productImagesName = (path) => {
    // const dirPath = path.join(process.argv[1] , '..', '..' , 'public' , 'images' , id)

    // const checkForFile = fs.existsSync(path)
    // if(!checkForFile) {
    //     console.log(1)
    //     return 1
    // }
    // console.log(path)

    const imagesName = fs.readdirSync(path)

    if(!!imagesName.length){
        if(imagesName.length === 10) throw createHttpError.BadRequest('each product cant have more than 10 images')
        return Math.max(...imagesName.map(name => +(name.split('.')[0]))) + 1
    } else {
        return 1
    }

}

export default productImagesName