const createFileLink = (req , path) => {
    if(req) return `${req.protocol}://${req.headers.host}/${path.replace('\\' , '/')}`
}

export default createFileLink