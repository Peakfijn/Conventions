module.exports = {
	extends: 'peakfijn',
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
