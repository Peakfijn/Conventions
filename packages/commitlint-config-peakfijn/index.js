'use strict';

const commitTypes = require('commit-types-peakfijn');

module.exports = {
	extends: [
		'@commitlint/config-conventional'
	],
	rules: {
		'header-max-length': [2, 'always', 80],
		'scope-empty': [2, 'always'],
		'subject-min-length': [2, 'always', 20],
		'type-enum': [2, 'always', Object.keys(commitTypes)],
	},
};
