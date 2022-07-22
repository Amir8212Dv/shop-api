import bcrypt from 'bcrypt'

export const hashPassword = password => {
    return bcrypt.hashSync(password , 8)
}

export const checkHashedPassword = (password , hashedText) => {
    console.log(password , hashedText)
    return bcrypt.compareSync(password , hashedText)
}