
const mongoose = require('mongoose')

const ratingSchema = mongoose.Schema({

    menu: {
        type: mongoose.Types.ObjectId,
        ref: "menu"
    },

    rate: {
        type: Number,
        default: 5.0
    },
},

    { timestamps: true }

)

module.exports = mongoose.model("rating", ratingSchema)

