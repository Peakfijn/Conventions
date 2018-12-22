import test from 'ava';
import { castArray } from 'lodash';
import config from './index';

test('config extends from standard', t => {
	t.true(castArray(config.extends).includes('stylelint-config-standard'));
});

test('config extends from concentric order', t => {
	t.true(castArray(config.extends).includes('stylelint-config-concentric-order'));
});

test('config defines indentation rule with tabs', t => {
	t.is(config.rules.indentation, 'tab');
});
