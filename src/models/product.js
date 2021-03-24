const mongoose = require("mongoose");
const productSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		slug: { type: String, required: true },
		description: { type: String, required: true },
		image_thumbnail: { type: String },
		image: { type: String },
		images: [{ type: String }],
		price: { type: Number, required: true },
		discount: { type: Number, default: 0 },
		quantity: { type: Number, required: true },
		base_price: { type: Number },
		category: {
			type: mongoose.Types.ObjectId,
			ref: "category",
			required: true,
		},
		subCategory: { type: String, required: true },
		vehicle: { type: mongoose.Types.ObjectId, ref: "vehicle", required: true },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("product", productSchema);
