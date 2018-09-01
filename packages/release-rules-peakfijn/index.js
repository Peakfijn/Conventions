'use strict';

const commitTypes = require('commit-types-peakfijn');
const defaultRules = [
	{ breaking: true, release: 'major' },
	{ revert: true, release: 'patch' },
];

module.exports = defaultRules.concat(
	Object.keys(commitTypes)
		.map(type => ({ type, release: commitTypes[type].release }))
		.filter(rule => !!rule.release)
);
