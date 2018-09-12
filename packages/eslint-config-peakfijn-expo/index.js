module.exports = {
	parser: 'babel-eslint',
	plugins: [
		'jest',
	],
	env: {
		'jest/globals': 'on',
	},
	settings: {
		'import/resolver': {
			'babel-module': {},
		},
	},
};
