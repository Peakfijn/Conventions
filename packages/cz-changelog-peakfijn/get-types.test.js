import test from 'ava';
import commitTypes from 'commit-types-peakfijn';
import { isEqual } from 'lodash';
import getTypes from './get-types';

const typeToChoice = (type, maxLength) => {
	const info = commitTypes[type] || { summary: '' };

	return {
		value: type,
		short: type,
		name: `${type.padEnd(maxLength)} ${info.summary}`.trim(),
	};
};

test('returns disabled without choices when type-enum is disabled', t => {
	const { enabled, maxLength, choices } = getTypes({
		rules: {
			'type-enum': [0],
		},
	});

	t.false(enabled);
	t.is(maxLength, 0);
	t.true(choices.length === 0);
});

test('returns enabled with choices when type-enum is enabled', t => {
	const types = ['fix', 'feature'];
	const { enabled, maxLength, choices } = getTypes({
		rules: {
			'type-enum': [2, 'always', types],
		},
	});

	const expectedChoices = types.map(type => typeToChoice(type, maxLength));

	t.true(enabled);
	t.is(maxLength, 'feature'.length);
	t.true(isEqual(choices, expectedChoices));
});

test('returns enabled with choices when type-enum is enabled and non-peakfijn types are used', t => {
	const types = ['hi', 'foo', 'bar'];
	const { enabled, maxLength, choices } = getTypes({
		rules: {
			'type-enum': [2, 'always', types],
		},
	});

	const expectedChoices = types.map(type => typeToChoice(type, maxLength));

	t.true(enabled);
	t.is(maxLength, 'foo'.length);
	t.true(isEqual(choices, expectedChoices));
});

test('returns enabled with choices (in order) when type-enum is enbaled', t => {
	const peakfijnTypes = Object.keys(commitTypes);
	const types = ['other'].concat(peakfijnTypes);
	const { enabled, maxLength, choices } = getTypes({
		rules: {
			'type-enum': [2, 'always', types],
		},
	});

	const expectedOrders = choices.every((choice, index) => {
		const typeIndex = peakfijnTypes.indexOf(choice.value);

		return typeIndex < 0 || typeIndex === index;
	});

	t.true(enabled);
	t.true(expectedOrders);
});
