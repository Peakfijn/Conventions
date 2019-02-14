import test from 'ava';
import types from 'commit-types-peakfijn';
import rules from '.';

test('breaking changes bumps new major version', t => {
	t.is(rules.find(rule => rule.breaking).release, 'major');
});

test('revert changes bumps new patch version', t => {
	t.is(rules.find(rule => rule.revert).release, 'patch');
});

test('all commit types are defined with their patch version', t => {
	Object.keys(types).forEach(type => {
		const expect = types[type].release;
		const rule = rules.find(rule => rule.type === type);

		if (expect) {
			t.is(rule.release, expect);
		} else {
			t.falsy(rule);
		}
	});
});
