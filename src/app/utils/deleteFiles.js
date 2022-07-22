import fs from 'fs'
import path from 'path'

const deleteFile = filePath => {
    if(filePath) fs.unlink(path.join(process.argv[1] , '..' , '..' , '..' , '..' , 'public' , filePath))
}

export default deleteFile