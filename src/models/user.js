const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        trim: true,
    },

    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        trim: true
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
        required: true,
        minlength: 3,
        maxlength: 255,
        trim: true
    },

    contact: {
        type: String,
        required: true,
        minlength: 9,
        maxlength: 11,
        trim: true
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