
const mongoose = require('mongoose')
const mongoosePaginate = require("mongoose-paginate-v2");

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true
    },

    subTotal: { type: Number, required: true },
    total: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    shippingFee: { type: Number, default: 500 },

    status: {
        type: String,
        required: true,
        enum: [
            "active",
            "pending",
            "accepted",
            "in Transit",
            "delivered",
            "cancelled",
        ],
        default: "pending",
    },
    orderItems: [
        {
            menu: {
                type: mongoose.Types.ObjectId,
                ref: "menu",

            },
            quantity: { type: Number },

        }

    ],
    address: { type: String, required: true },
    orderDate: { type: Date, default: null },
    deliveryDate: { type: Date, default: null },

    deliveryType: {
        type: String,
        required: true,
        enum: ["instant Delivery"],
    },


}, { timestamps: true, toObject: { getters: true } }
)

orderSchema.plugin(mongoosePaginate)

module.exports = mongoose.model("order", orderSchema)