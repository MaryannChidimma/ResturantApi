const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({

    fullName: {
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

    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "admin",
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model("admin", adminSchema);