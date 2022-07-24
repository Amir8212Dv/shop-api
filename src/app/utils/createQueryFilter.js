import mongoose from "mongoose"
import validateObjectId from "../validators/objectId.js"
import stringToArray from "./stringToArray.js"

const createQueryFilter = query => {
    if(!(Object.keys(query).length)) return {}

    const filter = {$and : []}
    Object.entries(query).map(async ([key , value]) => {
        if(key === 'search') {
            return filter.$and.push({$text : {$search : value}})
        } else if(key === 'categoryId') {
            await validateObjectId.validateAsync(value)
            return filter.$and.push({category : mongoose.Types.ObjectId(value)})
        } else if (key === 'tags') {
            const orderedTags = stringToArray(value)
            return filter.$and.push({tags : {$in : orderedTags}})
        } else if (key === 'discount' && value) {
            return filter.$and.push({discount : {$gt : 0}})
        } else if (key === 'price') {
            const min = +value.split(',')[0]
            const max = +value.split(',')[1]

            const maxPriceFilter = max > min ? {$lt : max} : {}

            return filter.$and.push({price : {$gt : min , ...maxPriceFilter}})
        } else if(key === 'status' && ['started' , 'notStarted' , 'finished'].includes(value)) {
            return filter.$and.push({status : value})
        } else if(['teacherId' , 'suplierId' , 'authorId'].includes(key)) {
            await validateObjectId.validateAsync(value)
            return filter.$and.push({[key.split('Id')[0]] : mongoose.Types.ObjectId(value)})
        } else return filter.$and.push({})
    })
    return filter
}

export default createQueryFilter
