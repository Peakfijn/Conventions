import test from 'ava';
import execa from 'execa';
import { isEqual } from 'lodash';
import { satisfies } from 'semver';
import eslintConfig from 'eslint-config-peakfijn-expo';
import pkg from './package';
import config from '.';

test('config exports original config', t => {
	t.true(isEqual(config, eslintConfig));
});

test('binary defers call to eslint', async t => {
	const { stdout: version } = await execa(
		pkg.bin.eslint,
		['--version'],
		{ cwd: __dirname },
	);

	t.true(satisfies(version, pkg.dependencies.eslint));
});
