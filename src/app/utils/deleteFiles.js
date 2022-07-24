import fs from 'fs'

const deleteFile = filePath => {
    if(filePath) fs.unlink(filePath , () => {})
}

export default deleteFile