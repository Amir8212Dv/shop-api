import jwt from 'jsonwebtoken'

const createToken = async (value ) => {
    return jwt.sign(value , process.env.SECRETE_KEY || 'jsonwebtoken' , {expiresIn : '1d'})
}

export default createToken