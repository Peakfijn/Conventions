import test from 'ava';
import types from 'commit-types-peakfijn';
import { includes, isEqual } from 'lodash';
import { rules } from './index';
import { rules as baseRules } from '@commitlint/config-conventional';

test('inherits basic rules from @commitlint/config-conventional', t => {
	t.true(includes(
		Object.keys(rules),
		...Object.keys(baseRules),
	));
});

test('header-max-length is defined as an error, always applicable and set to 80 characters', t => {
	t.true(isEqual(
		rules['header-max-length'],
		[2, 'always', 80],
	));
});

test('scope-empty is defined as an error and always applicable', t => {
	t.true(isEqual(
		rules['scope-empty'],
		[2, 'always'],
	));
});

test('subject-min-length is defined as error, always applicable and set to 20 characters', t => {
	t.true(isEqual(
		rules['subject-min-length'],
		[2, 'always', 20],
	));
});

test('type-enum is defined as error, always applicable and uses the peakfijn commit types', t => {
	t.true(isEqual(
		rules['type-enum'],
		[2, 'always', Object.keys(types)],
	));
});
