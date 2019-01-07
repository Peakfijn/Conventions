import test from 'ava';
import { castArray, has } from 'lodash';
import config from '.';

test('config extends from peakfijn', t => {
	t.true(castArray(config.extends).includes('peakfijn'));
});

test('config uses babel eslint parser', t => {
	t.is(config.parser, 'babel-eslint');
});

test('config uses jest plugin', t => {
	t.true(castArray(config.plugins).includes('jest'));
});

test('config defines global jest environment', t => {
	t.is(config.env['jest/globals'], 'on');
});

test('config defined babel module as import resolver', t => {
	t.true(has(config.settings['import/resolver'], 'babel-module'));
});
