import createHttpError from "http-errors"

export const createNotFoundError = item => {
    const [key , value] = Object.entries(item)[0]
    if(!value || ('matchedCount' in value || 'acknowledged' in value) && (+value.matchedCount + (typeof value.acknowledged === 'boolean' ? 0 : +value.acknowledged) === 0)){
        throw createHttpError.NotFound(`${key} not found`)
    }
}

export const createInternalServerError = value => {
    if(!value){
        throw createHttpError.InternalServerError(`process faild`)
    }
}

