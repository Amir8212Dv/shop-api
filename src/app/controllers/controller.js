
class Controller {
    userLookup(localField) {
        return [
            {$lookup : {
                from : 'users',
                localField,
                foreignField : '_id',
                as : localField
            }},
            {$project : {
                [`${localField}.bills`] : 0,
                [`${localField}.otp`] : 0,
                [`${localField}.discount`] : 0,
                [`${localField}.roles`] : 0,
                [`${localField}.mobile`] : 0,
            }}
        ]
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