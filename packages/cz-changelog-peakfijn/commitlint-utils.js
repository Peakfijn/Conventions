/**
 * Get information from the loaded commitlint config.
 * This will return an object containing the basic information for this rule.
 *
 * @param  {Object} commitlintConfig
 * @param  {Object} ruleName
 * @return {Object?}
 */
function getRule(commitlintConfig, ruleName) {
	const rule = commitlintConfig.rules[ruleName];

	if (rule) {
		return {
			raw: rule,
			level: rule[0],
			applicable: rule[1],
			value: rule[2],
		};
	}
}

/**
 * Determine if the rule is inverted or not.
 *
 * @param  {Object}  rule
 * @return {Boolean}
 */
function isInverted(rule = {}) {
	return rule.applicable === 'never';
}

/**
 * Determine if the rule is enabled or not.
 * This also makes sure that the rule is not inverted.
 *
 * @param  {Object}  rule
 * @return {boolean}
 */
function isEnabled(rule = {}) {
	return rule.level > 0 && !isInverted(rule);
}

module.exports = { getRule, isEnabled, isInverted };
