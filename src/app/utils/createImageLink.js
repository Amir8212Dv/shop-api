const createFileLink = (req , path) => {
    if(req) return `${req.protocol}://${req.headers.host}/${path.replace('\\' , '/')}`
    // return `${process.en}/${path.replace('\\' , '/')}`
}

export default createFileLink