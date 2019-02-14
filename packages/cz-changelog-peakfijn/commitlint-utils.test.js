import test from 'ava';
import chalk from 'chalk';
import { isEqual } from 'lodash';
import {
	getRule,
	ruleIsEnabled,
	ruleIsInverted,
	reportIsValid,
	reportSummary,
} from './commitlint-utils';

test('#getRule returns commitlint rule as object', t => {
	const rules = { 'header-max-length': [0, 'always', 72] };
	const rule = getRule({ rules }, 'header-max-length');
	const expected = {
		raw: [0, 'always', 72],
		level: 0,
		applicable: 'always',
		value: 72,
	};

	t.true(isEqual(rule, expected));
});

test('#getRule returns undefined when rule doesn\'t exist', t => {
	t.true(getRule({ rules: {} }, 'doesntexists') === undefined);
});

test('#ruleIsEnabled returns false for level 0', t => {
	t.false(ruleIsEnabled({ level: 0 }));
});

test('#ruleIsEnabled returns true for level 1', t => {
	t.true(ruleIsEnabled({ level: 1 }));
});

test('#ruleIsEnabled returns false for negated level 1', t => {
	t.false(ruleIsEnabled({ level: 1, applicable: 'never' }));
});

test('#ruleIsEnabled returns true for level 2', t => {
	t.true(ruleIsEnabled({ level: 2 }));
});

test('#ruleIsEnabled returns false for negated level 2', t => {
	t.false(ruleIsEnabled({ level: 2, applicable: 'never' }));
});

test('#ruleIsInverted returns false for always applicable rules', t => {
	t.false(ruleIsInverted({ applicable: 'always' }));
});

test('#ruleIsInverted returns true for never applicable rules', t => {
	t.true(ruleIsInverted({ applicable: 'never' }));
});

test('#reportIsValid returns true for valid reports without errors and warnings', t => {
	const report = {
		valid: true,
		errors: [],
		warnings: [],
	};

	t.true(reportIsValid(report));
});

test('#reportIsValid returns false for invalid reports without errors or warnings', t => {
	const report = {
		valid: false,
		errors: [],
		warnings: [],
	};

	t.false(reportIsValid(report));
});

test('#reportIsValid returns false for valid reports without errors and with warnings', t => {
	const report = {
		valid: false,
		errors: [],
		warnings: [
			{
				name: 'test-warning',
				message: 'This is a test warning',
			},
		],
	};

	t.false(reportIsValid(report));
});

test('#reportIsValid returns false for valid reports with errors but without warnings', t => {
	const report = {
		valid: false,
		errors: [
			{
				name: 'test-error',
				message: 'This is a test error',
			},
		],
		warnings: [],
	};

	t.false(reportIsValid(report));
});

test('#reportSummary returns empty string for valid reports without errors or warnings', t => {
	const report = {
		valid: true,
		errors: [],
		warnings: [],
	};

	t.is(reportSummary(report), '');
});

test('#reportSummary returns string with basic header and footer', t => {
	const report = {
		valid: false,
		errors: [
			{
				name: 'test-error',
				message: 'This is a test error',
			},
		],
		warnings: [],
	};

	const summary = reportSummary(report);

	t.true(summary.includes('Final commit violates conventions'));
	t.true(summary.includes('aborted commit'));
});

test('#reportSummary returns string with information about errors and warnings', t => {
	const report = {
		valid: false,
		errors: [
			{
				name: 'test-error',
				message: 'This is a test error',
			},
			{
				name: 'test-error-other',
				message: 'This is another test error',
			},
		],
		warnings: [
			{
				name: 'test-warning',
				message: 'This is a test warning',
			},
		],
	};

	const summary = reportSummary(report);

	t.true(summary.includes(chalk`{red 2} errors`));
	t.true(summary.includes(chalk`{bold.red -} This is a test error {dim test-error}`));
	t.true(summary.includes(chalk`{bold.red -} This is another test error {dim test-error-other}`));
	t.true(summary.includes(chalk`{yellow 1} warning`));
	t.true(summary.includes(chalk`{bold.yellow -} This is a test warning {dim test-warning}`));
});
