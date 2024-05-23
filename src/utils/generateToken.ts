import jwt from 'jsonwebtoken'

export const generateToken = async (email:string) => {
    return jwt.sign({data:email}, process.env.SE || '', { expiresIn: "1d" })
}

