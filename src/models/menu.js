const mongoose = require('mongoose')
const mongoosePaginate = require("mongoose-paginate-v2");

const menuSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    description: {
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
    discount: {
        type: Number,
        default: 0
    },

    category: {
        type: mongoose.Types.ObjectId,
        ref: "categories",
        required: true,
    },
    isPopular: {
        type: Boolean,
        default: false
    },

    isSpecial: {
        type: Boolean,
        default: false
    }

},
    {
        timestamps: true,
    }
);

menuSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("menu", menuSchema);
