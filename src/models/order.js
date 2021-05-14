
const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "users"
    },
    menu: [
        {
            menu: {
                type: mongoose.Types.ObjectId,
                ref: "menu"
            },
            quantity: { type: Number },
            price: { type: Number },
            discount: { type: Number }
        }
    ]


})

module.exports = mongoose.model(order, orderSchema)