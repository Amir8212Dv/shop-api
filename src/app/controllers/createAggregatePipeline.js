
class CreateAggregatePipeline {
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
            }},
            {
                $unwind : `$${localField}`
            }
        ]
    }
    categoryLookup() {
        return [
            {
                $lookup : {
                    from : 'categories',
                    localField : 'category',
                    foreignField : '_id',
                    as : 'category'
                }
            },
            {
                $unwind : '$category'
            }
        ]
        
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
    likesCount() {
        return {
            $addFields : {
                likesCount : {$size : '$likes'}
            }
        }
    }
    fileUrl(baseUrl , fieldName = 'image') {
        if(fieldName === 'image') {
            return {
                $addFields : {
                    imageURL : {$concat : [baseUrl  , '$image']}
                }
            } 
        } else if (fieldName === 'images') {
            return {
                $addFields : {
                    imageURL : {
                        $map : {
                            input : '$images',
                            as : 'image',
                            in : {$concat : [baseUrl  , '$$image']}
                        }
                    }
                }
            }
        } else if (fieldName === 'videoAddress') {
            return {
                $addFields : {
                    videoURL : {$concat : [baseUrl  , '$videoAddress']}
                }
            }
        }
    }
}

export default CreateAggregatePipeline