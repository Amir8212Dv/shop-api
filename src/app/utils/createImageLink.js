const createFileLink = (req , path) => {
    return `${req.protocol}://${req.headers.host}/${path.replace('\\' , '/')}`
}

export default createFileLink