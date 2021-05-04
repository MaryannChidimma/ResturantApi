
const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "users"
    },
    meals: [
        {
            meal: {
                type: mongoose.Types.ObjectId,
                ref: "meals"
            },
            quantity: { type: Number },
            price: { type: Number },
            discount: { type: Number }
        }
    ]


})

module.exports = mongoose.model(order, orderSchema)