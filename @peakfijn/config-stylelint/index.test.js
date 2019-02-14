import test from 'ava';
import execa from 'execa';
import { satisfies } from 'semver';
import { isEqual } from 'lodash';
import stylelintConfig from 'stylelint-config-peakfijn';
import pkg from './package';
import config from '.';

test('config exports original config', t => {
	t.true(isEqual(config, stylelintConfig));
});

test('binary defers call to stylelint', async t => {
	const { stdout: version } = await execa(
		pkg.bin.stylelint,
		['--version'],
		{ cwd: __dirname },
	);

	t.true(satisfies(version, pkg.dependencies.stylelint));
});
