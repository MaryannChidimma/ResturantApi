const mongoose = require('mongoose')

const mealSchema = new mongoose.Schema({

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
    }

},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("menu", mealSchema);
