
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
    commentsLookup() {
        return {
            $lookup : {
                from : 'comments',
                localField : 'comments',
                foreignField : '_id',
                as : 'comments'
            }
        }
        
    }
}

export default Controller