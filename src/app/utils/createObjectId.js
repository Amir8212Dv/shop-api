import mongoose from 'mongoose'


const createObjectId = () => {
    return new mongoose.Types.ObjectId()
}

export default createObjectId