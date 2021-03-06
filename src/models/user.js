const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const userSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			minlength: 3,
			required: true,
			trim: true,
		},

		email: {
			type: String,
			required: true,
			minlength: 3,
			trim: true,
		},
		password: {
			type: String,
			minlength: 3,
			trim: true,
		},

		phoneNumber: {
			type: String,
			minlength: 10,
			trim: true,
			default: null,
		},

		isVerified: {
			type: Boolean,
			default: false,
		},
		image: {
			type: String,
			default: null,
			trim: true
		},
		googleId: {
			type: String,
			default: null,
			trim: true,
		},
		address: {
			type: String,
			default: null,
			trim: true
		},
		token: {
			type: String
		}
	},
	{ timestamps: true }
);

userSchema.plugin(mongoosePaginate)
module.exports = mongoose.model("user", userSchema);
