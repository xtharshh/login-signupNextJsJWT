import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true
    },
    username:{
        type: String,
        required: [true,"Please enter a username"],
        unique: true
    },
    
    password:{
        type: String,
        required: [true,"Please enter a password"]
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    forgotPasswordToken:{
        type: String
    },
    forgotPasswordTokenExpiry:{
        type: Date
    },
    verifyToken:{   
        type: String
    },
    verifyTokenExpiry:{
        type: Date
    }
})

const User=mongoose.models.users || mongoose.model("users",userSchema);
export default User;