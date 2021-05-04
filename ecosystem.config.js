module.exports = {
	apps: [
		{
			name: "eva-kitchen-api",
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
