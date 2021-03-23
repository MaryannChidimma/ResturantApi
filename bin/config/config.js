const development = {
	env: "development",
	PORT: process.env.PORT || 3000,
	DB_URI: process.env.DB_URI || "mongodb://localhost:27017/partzshop",
	SERVER_TYPE: process.env.SERVER_TYPE || "http",
};

const production = {
	env: "production",
	PORT: process.env.PORT,
	DB_URI: process.env.DB_URI,
	SERVER_TYPE: process.env.SERVER_TYPE || "http",
};

const config = {
	development,
	production,
};

const env = process.env.NODE_ENV || "development";

module.exports = config[env];
