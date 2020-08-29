module.exports = {
	env: {
		es2020: true,
		node: true,
	},
	extends: ['eslint:recommended', 'plugin:prettier/recommended'],
	parserOptions: {
		ecmaVersion: 11,
		sourceType: 'module',
	},
	overrides: [
		{
			files: ['**/*.test.js'],
			env: {
				jest: true,
			},
		},
	],
};
