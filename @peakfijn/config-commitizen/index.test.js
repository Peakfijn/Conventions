import execa from 'execa';
import test from 'ava';
import { isEqual } from 'lodash';
import czConfig from 'cz-changelog-peakfijn';
import config from './index';
import pkg from './package.json';

test('config exports original config', t => {
	t.true(isEqual(config, czConfig));
});

test('binary defers call to commitizen', async t => {
	const { stdout: help } = await execa(
		pkg.bin.commitizen,
		['--help'],
		{ cwd: __dirname }
	);

	t.true(help.includes('Commitizen has two command line tools'));
});

test('binary defers call to git-cz', async t => {
	const { stdout: help } = await execa(
		pkg.bin['git-cz'],
		['--help'],
		{ cwd: __dirname }
	);

	t.true(help.includes('git-commit - Record changes to the repository'));
});
