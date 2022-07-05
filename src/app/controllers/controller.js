
class Controller {
    userLookup(localField) {
        return {
            $lookup : {
                from : 'users',
                localField,
                foreignField : '_id',
                as : localField
            }
        }
    }
    categoryLookup(localField) {
        return {
            $lookup : {
                from : 'categories',
                localField,
                foreignField : '_id',
                as : localField
            }
        }
        
    }
}

export default Controller