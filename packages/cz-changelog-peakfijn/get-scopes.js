'use strict';

module.exports = function getScopes(commitlint = {}) {
	const scopesAllowed = (commitlint.rules['scope-enum'] || [])[2];
	let scopes = [''];

	if (scopesAllowed && scopesAllowed.length) {
		scopes = scopes.concat(scopesAllowed);
	}

	const maxLength = scopes.reduce((carry, scope) => scope.length > carry ? scope.length : carry, 0);

	return {
		enabled: scopes.length > 1,
		maxLength: maxLength,
		choices: scopes.map(scope => ({
			value: scope,
			short: scope.length <= 0 ? '_none_' : scope,
			name: scope.length <= 0 ? '_none_' : scope,
		})),
	};
};
