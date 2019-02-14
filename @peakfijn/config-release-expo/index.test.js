import test from 'ava';
import execa from 'execa';
import { find, isEqual, template } from 'lodash';
import pkg from './package';
import config from '.';

test('config uses develop branch', t => {
	t.is(config.branch, 'develop');
});

test('config uses unprefixed version name for tags', t => {
	const version = '1.0.0';
	const render = template(config.tagFormat);

	t.is(render({ version }), version);
});

test('config uses default commit analyser with peakfijn presets', t => {
	t.is(config.analyzeCommits.path, '@semantic-release/commit-analyzer');
	t.is(config.analyzeCommits.preset, 'peakfijn');
	t.is(config.analyzeCommits.releaseRules, 'release-rules-peakfijn');
});

test('config uses default notes generator with peakfijn presets', t => {
	const generator = find(config.generateNotes, {
		path: '@semantic-release/release-notes-generator',
		preset: 'peakfijn',
	});

	t.truthy(generator);
});

test('config uses the changelog plugin', t => {
	t.true(config.verifyConditions.includes('@semantic-release/changelog'));
	t.true(config.prepare.includes('@semantic-release/changelog'));
});

test('config uses the npm plugin, without publishing by default', t => {
	const prepare = find(config.prepare, { path: '@semantic-release/npm' });

	t.true(config.verifyConditions.includes('@semantic-release/npm'));
	t.false(prepare.npmPublish);
});

test('config uses the expo plugin, with test, staging and production manifests by default', t => {
	const prepare = find(config.prepare, { path: 'semantic-release-expo' });
	const manifests = [
		'app.test.json',
		'app.staging.json',
		'app.production.json',
	];

	t.true(config.verifyConditions.includes('semantic-release-expo'));
	t.true(isEqual(prepare.manifests, manifests));
});

test('config uses the git branches pluginwith proper branches', t => {
	const prepare = find(config.prepare, { path: 'semantic-release-git-branches' });
	const hasBranches = isEqual(prepare.branchMerges, ['develop', 'master']);

	t.true(config.verifyConditions.includes('semantic-release-git-branches'));
	t.true(prepare.branchPush);
	t.true(hasBranches);
});

test('config uses the git branches plugin with proper assets', t => {
	const prepare = find(config.prepare, { path: 'semantic-release-git-branches' });
	const assets = [
		'CHANGELOG.md',
		'package.json',
		'package-lock.json',
		'app.test.json',
		'app.staging.json',
		'app.production.json',
	];

	t.true(isEqual(prepare.assets, assets));
});

test('config uses the git branches plugin with proper message', t => {
	const prepare = find(config.prepare, { path: 'semantic-release-git-branches' });
	const render = template(prepare.message);
	const nextRelease = {
		version: '1.0.0',
		notes: 'Changes',
	};

	t.is(render({ nextRelease }), 'release: create new version 1.0.0\n\nChanges');
});

test('config doesnt publish or notfies by default', t => {
	t.false(config.publish);
	t.false(config.success);
	t.false(config.fail);
});

test('config defines all plugins in proper order', t => {
	const prepare = config.prepare.map(plugin => plugin.path || plugin);
	const order = [
		'@semantic-release/changelog',
		'@semantic-release/npm',
		'semantic-release-expo',
		'semantic-release-git-branches',
	];

	t.true(isEqual(config.verifyConditions, order));
	t.true(isEqual(prepare, order));
});

test('binary defers call to semantic release', async t => {
	const { stdout: help } = await execa(
		pkg.bin['semantic-release'],
		['--help'],
		{ cwd: __dirname },
	);

	t.true(help.includes('Run automated package publishing'));
});
