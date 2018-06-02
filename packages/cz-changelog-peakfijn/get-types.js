'use strict';

const commitTypes = require('commit-types-peakfijn');
const { getRule } = require('./commitlint-utils');

module.exports = function getTypes(commitlint = {}) {
	const typesAllowed = getRule(commitlint, 'type-enum').value;

	let types = Object.keys(commitTypes);

	if (typesAllowed.length > 0) {
		types = types.filter(function (type) {
			return typesAllowed.indexOf(type) >= 0;
		});
	}

	const maxLength = types.reduce((carry, type) => type.length > carry ? type.length : carry, 0);

	return {
		enabled: true,
		maxLength: maxLength,
		choices: types.map(type => ({
			value: type,
			short: type,
			name: `${type.padEnd(maxLength)} ${commitTypes[type].summary}`,
		})),
	};
};
