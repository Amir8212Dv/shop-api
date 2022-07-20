import createHttpError from "http-errors"

export const createNotFoundError = item => {
    const [key , value] = Object.entries(item)[0]
    if(!value || !(+value.matchedCount + +value.cknowledged)) throw createHttpError.NotFound(`${key} not found`)
}