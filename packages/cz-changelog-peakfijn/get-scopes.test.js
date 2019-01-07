import test from 'ava';
import { isEqual } from 'lodash';
import getScopes from './get-scopes';

const noneChoice = {
	value: '',
	short: '--- none ---',
	name: '--- none ---',
};

const scopeToChoice = scope => ({
	value: scope,
	short: scope,
	name: scope,
});

test('returns disabled without choices when scope-empty is disabled', t => {
	const { enabled, maxLength, choices } = getScopes({
		rules: {
			'scope-empty': [0],
		},
	});

	t.false(enabled);
	t.is(maxLength, 0);
	t.true(isEqual(choices, [noneChoice]));
});

test('returns disabled with -none- choice when scope-empty is (always) enabled', t => {
	const { enabled, maxLength, choices } = getScopes({
		rules: {
			'scope-empty': [2, 'always'],
		},
	});

	t.false(enabled);
	t.is(maxLength, 0);
	t.true(isEqual(choices, [noneChoice]));
});

test('returns disabled without choices when scope-empty is (never) enabled', t => {
	const { enabled, maxLength, choices } = getScopes({
		rules: {
			'scope-empty': [2, 'never'],
		},
	});

	t.false(enabled);
	t.is(maxLength, 0);
	t.true(choices.length === 0);
});

test('returns enabled with scopes when scope-empty is never and scope-enum is defined', t => {
	const scopes = ['fix', 'feat', 'refactor'];
	const { enabled, maxLength, choices } = getScopes({
		rules: {
			'scope-empty': [2, 'never'],
			'scope-enum': [2, 'always', scopes],
		},
	});

	const expectedChoices = scopes.map(scope => scopeToChoice(scope));

	t.true(enabled);
	t.is(maxLength, 'refactor'.length);
	t.true(isEqual(choices, expectedChoices));
});

test('#getScopes returns enabled with none and scopes when scope-empty is always and scope-enum is defined', t => {
	const scopes = ['fix', 'ci'];
	const { enabled, maxLength, choices } = getScopes({
		rules: {
			'scope-empty': [0],
			'scope-enum': [2, 'always', scopes],
		},
	});

	const expectedChoices = [noneChoice].concat(
		scopes.map(scope => scopeToChoice(scope)),
	);

	t.true(enabled);
	t.is(maxLength, 'fix'.length);
	t.true(isEqual(choices, expectedChoices));
});
