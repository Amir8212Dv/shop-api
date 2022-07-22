import createHttpError from "http-errors"

export const createNotFoundError = item => {
    const [key , value] = Object.entries(item)[0]
    if(!value || ('matchedCount' in value || 'knowledged' in value) && (+value.matchedCount + +value.knowledged > 0)){
        throw createHttpError.NotFound(`${key} not found`)
    }
}
