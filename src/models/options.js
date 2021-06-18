const mongoose = require('mongoose')

const optionsSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    image: {
        type: String
    },

    price: {
        type: Number,
        required: true
    },

    isAvailable: {
        type: Boolean,
        default: true
    },

},

    {
        timestamps: true,
    }
);

module.exports = mongoose.model("option", optionsSchema);
