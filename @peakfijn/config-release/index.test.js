import test from 'ava';
import execa from 'execa';
import {
	castArray,
	isArray,
	isEqual,
	template,
} from 'lodash';

import config from './index';
import pkg from './package.json';

const findPlugin = (name) => {
	const plugin = config.plugins.find(plugin => (
		castArray(plugin)[0] === name
	));

	if (!plugin || !isArray(plugin)) {
		return plugin;
	}

	return plugin[1] || plugin[0];
};

test('config uses develop branch', t => {
	t.is(config.branch, 'develop');
});

test('config uses unprefixed version name for tags', t => {
	const version = '1.0.0';
	const render = template(config.tagFormat);

	t.is(render({ version }), version);
});

test('config uses commit analyser with peakfijn preset', t => {
	const plugin = findPlugin('@semantic-release/commit-analyzer');

	t.is(plugin.preset, 'peakfijn');
	t.is(plugin.releaseRules, 'release-rules-peakfijn');
});

test('config uses release note generator with peakfijn preset', t => {
	const plugin = findPlugin('@semantic-release/release-notes-generator');

	t.is(plugin.preset, 'peakfijn');
});

test('config uses changelog plugin', t => {
	t.truthy(findPlugin('@semantic-release/changelog'));
});

test('config uses npm plugin', t => {
	t.truthy(findPlugin('@semantic-release/npm'));
});

test('config uses git plugin with predefined message and assets', t => {
	const plugin = findPlugin('@semantic-release/git');
	const assets = [
		'CHANGELOG.md',
		'package.json',
		'package-lock.json',
	];

	t.is(plugin.message, 'release: create new version ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}');
	t.true(isEqual(plugin.assets, assets));
});

test('config uses github plugin', t => {
	t.truthy(findPlugin('@semantic-release/github'));
});
