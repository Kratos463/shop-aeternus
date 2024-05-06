import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please provide a first name"],
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Please  provide a email"],
        unique: true
    },
    phone: {
        type: String,
        required: [true, "Please  provide a phone number"],
        unique: true
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: [true, "Please provide a gender information"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"]
    },

    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date

}, { timestamps: true })

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User