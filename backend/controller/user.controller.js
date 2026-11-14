import User from "../model/user.model.js";
import bcrypt from 'bcryptjs'
import { generateToken } from "../jwt/token.js";

export const register = async (req, res) => {
    try{
        const {username, email, password} = req.body;
        if(!username || !email || !password){
            return res.status(401).json({
                message: "Something is missing, Please check!",
                success:false,
            })
        }
        const user = await User.findOne({email})
        if(user){
            return res.status(401).json({
                message: "User Allready existes",
                success:false,
            })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ username, email, password:hashPassword })
        await newUser.save()
        if(newUser){
            const token = await generateToken(newUser._id, res)
            res.status(201).json({
                message:"user registered successfully", newUser, token
            })
        }
    }catch(error){
        console.log(error)
        res.status(400).json({message:"Error register user"})
    }
}


export const login = async (req, res) => {
    let {email, password} = req.body;
    try{  
        if(!email || !password){
            return res.status(401).json({
                message: "Something is missing, Please check!",
                success:false,
            })
        }
        let user = await User.findOne({email})
        if(!user){
            return res.status(401).json({
                message: "Something went wrong",
                success:false,
            })
        }
        
        const matchPassword = await bcrypt.compare(password, user.password)
        if(!matchPassword){
            return res.status(401).json({
                message: "Something went wrong",
                success:false,
            })
        }
        const token = await generateToken(user._id, res)
        res.status(200).json({message:"user login successfully", user})

    }catch(error){
        console.log(error)
        res.status(400).json({message:"Error login user"})
    }
}


export const logout = async (req, res) => {
    try{
        return res.cookie("token","", {maxAge:0}).json({
            message: 'Logged out successfully',
            success:true
        })
    }catch(error){
        console.log(error)
    }
}



