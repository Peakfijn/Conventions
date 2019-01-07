const commitTypes = require('commit-types-peakfijn');
const { getRule, ruleIsEnabled } = require('./commitlint-utils');

function getTypeSummary(type) {
	const info = commitTypes[type];

	if (info && info.summary) {
		return info.summary;
	}

	return '';
}

function sortTypeEnums(types) {
	const peakfijnTypes = Object.keys(commitTypes);

	return types.sort((a, b) => {
		const aIndex = peakfijnTypes.indexOf(a);
		const bIndex = peakfijnTypes.indexOf(b);

		if (aIndex >= 0 && bIndex >= 0) {
			return aIndex - bIndex;
		} else if (aIndex >= 0 && bIndex < 0) {
			return -1
		} else if (aIndex < 0 && bIndex >= 0) {
			return 1;
		}

		return 0;
	});
}

module.exports = function getTypes(commitlint = {}) {
	const typeRule = getRule(commitlint, 'type-enum');
	const typeEnums = sortTypeEnums(typeRule.value || []);

	const maxLength = typeEnums.reduce((carry, type) => type.length > carry ? type.length : carry, 0);

	return {
		enabled: ruleIsEnabled(typeRule),
		maxLength: maxLength,
		choices: typeEnums.map(type => ({
			value: type,
			short: type,
			name: `${type.padEnd(maxLength)} ${getTypeSummary(type)}`.trim(),
		})),
	};
};
