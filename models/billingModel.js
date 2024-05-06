const mongoose = require("mongoose")

const billingSChema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "users",
        required: true
    },
    address: [
        {
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
            houseNo: {
                type: String,
                trim: true
            },
            street: {
                type: String,
                required: [true, "Please provide a street information"],
                trim: true
            },
            landmark: {
                type: String,
                trim: true
            },
            city: {
                type: String,
                required: true,
                trim: true
            },
            state: {
                type: String,
                required: true,
                trim: true
            },
            postalcode: {
                type: String,
                required: true,
                trim: true
            },
            country: {
                type: String,
                required: true,
                trim: true
            },
            alternativePhone: {
                type: String,
                trim: true
            },
        }
    ]
})

const Billing = mongoose.models.billings || mongoose.model("billings", billingSChema)

module.exports = Billing