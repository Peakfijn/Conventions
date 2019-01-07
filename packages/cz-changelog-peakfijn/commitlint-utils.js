const chalk = require('chalk');

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
function ruleIsInverted(rule = {}) {
	return rule.applicable === 'never';
}

/**
 * Determine if the rule is enabled or not.
 * This also makes sure that the rule is not inverted.
 *
 * @param  {Object}  rule
 * @return {boolean}
 */
function ruleIsEnabled(rule = {}) {
	return rule.level > 0 && !ruleIsInverted(rule);
}

/**
 * Determine if the report is valid and doesn't contain errors or warnings.
 *
 * @param  {Object} report
 * @return {boolean}
 */
function reportIsValid(report = {}) {
	return report.valid && report.errors.length === 0 && report.warnings.length === 0;
}

/**
 * Log the provided lint report to the console.
 * It should contain all information for the user to understand a possible rejection.
 *
 * @param  {Object} report
 * @return {string}
 */
function reportSummary(report = {}) {
	if (reportIsValid(report)) {
		return '';
	}

	const countErrors = report.errors.length;
	const countWarnings = report.warnings.length;
	const color = countErrors > 0 ? 'red' : 'yellow';

	let summaries = [];
	let issues = [];

	if (countErrors > 0) {
		summaries.push(chalk`{red ${countErrors}} ${countErrors === 1 ? 'error' : 'errors'}`);
		report.errors.forEach(function (error) {
			issues.push(chalk`  {bold.red -} ${error.message} {dim ${error.name}}`);
		});
	}

	if (countWarnings > 0) {
		summaries.push(chalk`{yellow ${countWarnings}} ${countWarnings === 1 ? 'warning' : 'warnings'}`);
		report.warnings.forEach(function (warning) {
			issues.push(chalk`  {bold.yellow -} ${warning.message} {dim ${warning.name}}`);
		});
	}

	const summary = !summaries.length ? '' : chalk`{dim ${summaries.join(', ')}}`;
	const header = chalk`{bold.${color} !} {bold Final commit violates conventions} ${summary}`;
	const footer = chalk`{dim aborted commit}`;

	return `${header}\n${issues.join('\n')}\n\n  ${footer}`;
}

module.exports = {
	getRule,
	ruleIsEnabled,
	ruleIsInverted,
	reportIsValid,
	reportSummary,
};
