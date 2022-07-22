import jwt from 'jsonwebtoken'

const createToken = async (value ) => {
    return jwt.sign(value , process.env.JWT_SECRETE_KEY , {expiresIn : '1d'})
}

export default createToken