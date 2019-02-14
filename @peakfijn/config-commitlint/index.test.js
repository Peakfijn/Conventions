import test from 'ava';
import execa from 'execa';
import { satisfies } from 'semver';
import { isEqual } from 'lodash';
import commitlintConfig from 'commitlint-config-peakfijn';
import pkg from './package';
import config from '.';

test('config exports original config', t => {
	t.true(isEqual(config, commitlintConfig));
});

test('binary defers call to commitlint', async t => {
	const { stdout: version } = await execa(
		pkg.bin.commitlint,
		['--version'],
		{ cwd: __dirname },
	);

	t.true(satisfies(version, pkg.dependencies.commitlint));
});
