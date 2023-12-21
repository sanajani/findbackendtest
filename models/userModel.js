import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, "Name field is required"]
    },
    email:{
        type:String,
        required:[true, "Email field is required"],
        unique: [true, "Email field should be unique"]
    },
    password:{
        type:String,
        required:[true, "Password field is required"],
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    isWorker:{
        type: Boolean,
        default: false
    },
    profileImageURL:{
        type:String
    },
    province:{
        type:String,
        required: true
    },
    personalInfo:{
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required: true
    },
    job:{
        type:String,
        required: true
    },
    experience:{
        type:String,
    },
    phoneNumber1:{
        type:String,
        required: true
    },
    phoneNumber2:{
        type:String,
    }
})

const userModel = mongoose.model("users",userSchema)
export default userModel