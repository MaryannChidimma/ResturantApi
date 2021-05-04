const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({

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
}, { timestamps: true })

module.exports = mongoose.model(admin, adminSchema);