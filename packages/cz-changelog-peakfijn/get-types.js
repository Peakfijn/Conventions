'use strict';

const commitTypes = require('commit-types-peakfijn');

module.exports = function getTypes(commitlint = {}) {
	const typesAllowed = (commitlint.rules['type-enum'] || [])[2];
	let types = Object.keys(commitTypes);

	if (typesAllowed && typesAllowed.length) {
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
