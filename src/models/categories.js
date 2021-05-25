const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    menus: [{type: mongoose.Schema.Types.ObjectId, ref: 'menu'}]
},
    {
        timestamps: true,

    })

module.exports = mongoose.model("categories", categorySchema)
