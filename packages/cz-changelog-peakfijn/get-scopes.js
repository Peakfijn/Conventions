const { getRule, ruleIsEnabled } = require('./commitlint-utils');

module.exports = function getScopes(commitlint = {}) {
	const scopeEmptyRule = getRule(commitlint, 'scope-empty');
	const scopeEnumRule = getRule(commitlint, 'scope-enum') || { value: [] };

	// add `none` option if scopes are optional
	let scopes = scopeEmptyRule.level > 0 && scopeEmptyRule.applicable === 'never' ? [] : [''];

	if (scopeEnumRule.value.length > 0) {
		scopes = scopes.concat(scopeEnumRule.value);
	}

	const maxLength = scopes.reduce((carry, scope) => scope.length > carry ? scope.length : carry, 0);

	return {
		enabled: !ruleIsEnabled(scopeEmptyRule) && maxLength > 0,
		maxLength: maxLength,
		choices: scopes.map(scope => ({
			value: scope,
			short: scope.length <= 0 ? '--- none ---' : scope,
			name: scope.length <= 0 ? '--- none ---' : scope,
		})),
	};
};
