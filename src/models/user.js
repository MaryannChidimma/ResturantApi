const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			minlength: 3,
			maxlength: 255,
			required: true,
			trim: true,
		},

		email: {
			type: String,
			required: true,
			minlength: 3,
			maxlength: 255,
			trim: true,
		},
		password: {
			type: String,
			minlength: 3,
			maxlength: 255,
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
            dafault: null,
        },
		address: {
			type: String,
			dafault: null,
		},
		googleId: {
			type: String,
			default: null,
			trim: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
