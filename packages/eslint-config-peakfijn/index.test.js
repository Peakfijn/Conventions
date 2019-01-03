import test from 'ava';
import { castArray, isEqual } from 'lodash';
import config from './index';

test('config extends from airbnb', t => {
	t.true(castArray(config.extends).includes('airbnb'));
});

test('config plugins contains jsdoc', t => {
	t.true(castArray(config.plugins).includes('jsdoc'));
});

test('config defines max length rule with 120 characters', t => {
	t.true(isEqual(config.rules['max-len'], ['error', 120]));
});

test('config defines all indentation rules with tabs', t => {
	t.true(isEqual(config.rules['no-tabs'], 'off'));
	t.true(isEqual(config.rules['indent'], ['error', 'tab', { SwitchCase: 1 }]));
	t.true(isEqual(config.rules['react/jsx-indent'], ['error', 'tab']));
	t.true(isEqual(config.rules['react/jsx-indent-props'], ['error', 'tab']));
});

test('config defines valid jsdoc rule as error with proper basic settings', t => {
	const rule = config.rules['valid-jsdoc'];
	const ruleProps = rule[1];

	t.is(rule[0], 'error');
	t.false(ruleProps.requireParamDescription);
	t.false(ruleProps.requireReturnDescription);
});

test('config defines valid jsdoc rule with description match to avoid default values', t => {
	const regex = new RegExp(config.rules['valid-jsdoc'][1].matchDescription);

	t.true(regex.test('Foo bar is a test function.'));
	t.false(regex.test('[fooBar description]'));
});

test('config defines valid jsdoc rule with proper prefer names', t => {
	t.true(isEqual(config.rules['valid-jsdoc'][1].prefer, {
		arg: 'param',
		argument: 'param',
		returns: 'return',
	}));
});

test('config defined valid jsdoc rule with proper prefer type', t => {
	t.true(isEqual(config.rules['valid-jsdoc'][1].preferType, {
		array: 'Array',
		bool: 'boolean',
		Bool: 'boolean',
		Boolean: 'boolean',
		event: 'Event',
		float: 'number',
		int: 'number',
		Number: 'number',
		Object: 'Object',
		ReactComponent: 'React.Component',
		ReactElement: 'React.Element',
		ReactNode: 'React.Node',
		String: 'string',
		Undefined: 'undefined',
	}));
});

test('config defines (jsx) quotes rule as prefer single', t => {
	t.true(isEqual(config.rules['jsx-quotes'], ['error', 'prefer-single']));
});

test('config defines (jsx) filename extension rule as off', t => {
	t.true(isEqual(config.rules['react/jsx-filename-extension'], 'off'));
});

test('config defines (jsdoc) check rules for param names and types as error', t => {
	t.true(isEqual(config.rules['jsdoc/check-param-names'], 'error'));
	t.true(isEqual(config.rules['jsdoc/check-types'], 'error'));
});

test('config defines (jsdoc) newline after description rule as error', t => {
	t.true(isEqual(config.rules['jsdoc/newline-after-description'], 'error'));
});

test('config defines (jsdoc) require complete description sentence rule as error', t => {
	t.true(isEqual(config.rules['jsdoc/require-description-complete-sentence'], 'error'));
});

test('config defines (jsdoc) require param rules as error', t => {
	t.true(isEqual(config.rules['jsdoc/require-param'], 'error'));
	t.true(isEqual(config.rules['jsdoc/require-param-name'], 'error'));
	t.true(isEqual(config.rules['jsdoc/require-param-type'], 'error'));
});

test('config defines (jsdoc) require return type rules as error', t => {
	t.true(isEqual(config.rules['jsdoc/require-returns-type'], 'error'));
});
