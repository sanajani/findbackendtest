import userModel from '../models/userModel.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import CustomError from '../utils/CustomError.js'
dotenv.config();

const JWTSECRETKEY = process.env.JWT_SECRETKEY || ''

// Signup or Create Worker Account
export const createUser = async (req,res,next) => {
    const {name,email,password,lastName,job,experience,phoneNumber1,phoneNumber2, province,personalInfo,profileImageURL} = req.body;
    if(!name || !email || !password || !job || !phoneNumber1 || !province || !personalInfo) return next(new CustomError("All the fields are required",403))

    try {
        const isUserExist = await userModel.findOne({email})
        if(isUserExist) return next(new CustomError("User Already Exist!!!", 402))

        const hashPassword = bcryptjs.hashSync(password, 12)

        const newUser = userModel({
            name,
            email,
            lastName,
            job,
            experience,
            phoneNumber1,
            phoneNumber2,
            province,
            personalInfo,
            profileImageURL,
            password: hashPassword,
            isWorker: true
        })
        await newUser.save();
        newUser.password = ''
        return res.status(200).json({message:"user created Successfully", success: true, data:newUser})
    } catch (error) {
        next(new CustomError(error.message, error.statusCode))
    }
}

export const loginUser = async (req,res,next) => {
    const {email,password} = req.body;
    console.log(email,password);
    try {
        const isUserExist = await userModel.findOne({email})
        if(!isUserExist) return next(new CustomError("Invalid Email or Password",401))

        const isPasswordCorrect = bcryptjs.compareSync(password,isUserExist.password)
        console.log(isPasswordCorrect);
        if(!isPasswordCorrect) return next(new CustomError("Invalid Password or Email" ,403))

        const token = jwt.sign({_id: isUserExist._id}, JWTSECRETKEY,{
            expiresIn:'1d'
        })

        return res.status(200).json({message:"Signup Successfully", success: true, data:token})
    } catch (error) {
        console.log("Error",error);
        next(new CustomError(error.message, error.statusCode))
    }
}

// export const getAllUsers = async (req,res,next) => {
//     const job = req.query.job;
//     console.log(job);
//     const limit = parseInt(req?.query?.limit) || 8;
//     const page = parseInt(req?.query?.page) || 1;
//     try {
//         const allUsers = await userModel.find().limit(limit * 1).skip((page - 1) * limit).select('-password').exec();
//         const count = await userModel.countDocuments();
//         const totalPages = Math.floor((count + limit - 1) / limit);
//         return res.status(200).json({success: true, data: allUsers, totalPages,page})
//     } catch (error) {
//         next(new CustomError(error.message, error.statusCode))
//     }
// }

export const getAllUsers = async (req, res, next) => {
    const { job, province, limit: rawLimit, page: rawPage } = req.query;
    const limit = parseInt(rawLimit) || 8;
    const page = parseInt(rawPage) || 1;

    try {
        let query = {};

        // Check for job query
        if (job) {
            query.job = job;
        }

        // Check for province query
        if (province) {
            query.province = province;
        }

        // Check for both job and province queries
        if (job && province) {
            query = { job, province };
        }

        // If neither job nor province is provided, query for all users
        if (!job && !province) {
            query = {};
        }

        const allUsers = await userModel
            .find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .select('-password')
            .exec();

        const count = await userModel.countDocuments(query);
        const totalPages = Math.floor((count + limit - 1) / limit);

        return res.status(200).json({ success: true, data: allUsers, totalPages, page });
    } catch (error) {
        next(new CustomError(error.message, error.statusCode));
    }
};



// update worker data
export const updateUser = async (req,res,next) => {
    const {name,email,lastName,job,experience,phoneNumber1,phoneNumber2, province,personalInfo,profileImageURL} = req.body;
    console.log(personalInfo);
    const userFromUserModel = await userModel.findOne({email},'-password')
    if(!userFromUserModel) return next(new CustomError("UserNot Found",403))
    try {
       const userDataUpdated = await userModel.findOneAndUpdate({email},{
            name,
            email,
            lastName,
            job,
            experience,
            phoneNumber1,
            phoneNumber2,
            province,
            personalInfo,
            profileImageURL
        },{new:true})
        return res.status(200).json({message:"worker update Successfully", success: true, data:userDataUpdated})
    } catch (error) {
        next(new CustomError(error.message, error.statusCode))
    }
}


// get single user from worker database
export const getSingleUser = async (req,res,next) => {
    const email = req?.params?.email;
    try {
     const userData = await userModel.findOne({email})
     console.log(userData);
     if(!userData) return next(new CustomError("User Not Found",403))
     return res.status(200).json({message:`there is ${userData?.name} jan's informtion`, success: true, data:userData})
    } catch (error) {
         next(new CustomError(error.message, error.statusCode))
    }
 }

//  const getSingleUser
