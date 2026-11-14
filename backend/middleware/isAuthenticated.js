import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

const isAuthenticated = async(req, res, next)=>{
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:"User not authenticated",
                success:false,
            })
        }
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        // console.log(decode)
        if(!decode){
            return res.status(401).json({
                message:"Invalid token",
                success:false,
            })
        }
        req.userId = decode.userId
        // req.user = User.findById(decode.userId);
        // console.log(req.user)
        next();
    }catch(error){
        console.log("error")
    }
}

export default isAuthenticated;