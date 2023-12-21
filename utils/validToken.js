import jwt from 'jsonwebtoken'
import CustomError from './CustomError.js'
import dotenv from 'dotenv'
dotenv.config();
const JWT_SECRETKEY = process.env.JWT_SECRETKEY || ''

export const checkJWT = (req,res,next) => {
    const headers = req.headers.authorization
    const token = headers.split(" ")[1]
    jwt.verify(token,JWT_SECRETKEY,(err,user) => {
        if(err){
            console.log('this is error');
            // console.log(err.stack);
            return next(new CustomError("Invalid Token",err.date))
        }else{
            console.log(user);
            next()
        }
    })
}