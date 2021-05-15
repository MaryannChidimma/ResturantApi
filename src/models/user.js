const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        trim: true
    },
    password: {
        type: String,
        minlength: 3,
        maxlength: 255,
        trim: true
    },

    contact: {
        type: String,
        minlength: 9,
        maxlength: 11,
        trim: true,
        default: null
    },

    phoneNumber: {
        type: String,
        minlength: 10,
        trim: true,
        default: null
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    address: {
        location: {
            type: String,
            dafault: null
        },
        state: {
            type: String,
            default: null,
            trim: true
        }
    },
    googleId: {
        type: String,
        default: null,
        trim: true
    }

}, { timestamps: true })

module.exports = mongoose.model("user", userSchema)