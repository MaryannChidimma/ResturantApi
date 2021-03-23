module.exports = {
	apps: [
		{
			name: "Partzshop-api",
			script: "bin/www.js",
			instances: "max",
			env: {
				NODE_ENV: "development",
			},
			env_staging: {
				NODE_ENV: "staging",
			},
			env_production: {
				NODE_ENV: "production",
			},
		},
	],
};
