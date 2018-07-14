'use strict';

const commitTypes = require('commit-types-peakfijn');

module.exports = Object.keys(commitTypes)
	.map(type => ({ type, release: commitTypes[type].release }))
	.filter(rule => !!rule.release);
