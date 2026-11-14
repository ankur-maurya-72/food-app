import jwt from 'jsonwebtoken'
import User from '../model/user.model.js'

export const generateToken = async (userId, res) =>{

    const token = jwt.sign({userId}, process.env.SECRET_KEY,{expiresIn:'1d'})
    res.cookie("token", token, {
        httpOnly: true, 
        secure: false,
        sameSite:'strict',
        path:"/",
    })

    await User.findByIdAndUpdate(userId, {token})
    return token;
}


