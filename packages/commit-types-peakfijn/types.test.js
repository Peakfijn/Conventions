import test from 'ava';
import types from './types.json';

/**
 * Estimate if a certain value can be human readable.
 *
 * @param  {any} value
 * @return {boolean}
 */
const isHumanReadable = value => (
	typeof value === 'string' && value.length > 0
);

test('types are defined in proper order', t => {
	const typesList = Object.keys(types);
	const expectedOrder = [
		'feature',
		'fix',
		'test',
		'performance',
		'documentation',
		'pipeline',
		'style',
		'refactor',
		'release',
		'chore',
	];

	t.true(
		typesList.reduce(
			(success, type, index) => success && expectedOrder.indexOf(type) === index,
			true
		)
	);
});

test('feature is defined as minor release with human-readable information', t => {
	t.is(types.feature.release, 'minor');
	t.true(isHumanReadable(types.feature.name));
	t.true(isHumanReadable(types.feature.summary));
});

test('fix is defined as patch release with human-readable information', t => {
	t.is(types.fix.release, 'patch');
	t.true(isHumanReadable(types.fix.name));
	t.true(isHumanReadable(types.fix.summary));
});

test('test is defined as patch release with human-readable information', t => {
	t.is(types.test.release, 'patch');
	t.true(isHumanReadable(types.test.name));
	t.true(isHumanReadable(types.test.summary));
});

test('performance is defined as patch release with human-readable information', t => {
	t.is(types.performance.release, 'patch');
	t.true(isHumanReadable(types.performance.name));
	t.true(isHumanReadable(types.performance.summary));
});

test('documentation is defined as patch release with human-readable information', t => {
	t.is(types.documentation.release, 'patch');
	t.true(isHumanReadable(types.documentation.name));
	t.true(isHumanReadable(types.documentation.summary));
});

test('pipeline is defined without release and with human-readable information', t => {
	t.is(types.pipeline.release, null);
	t.true(isHumanReadable(types.pipeline.name));
	t.true(isHumanReadable(types.pipeline.summary));
});

test('style is defined without release and with human-readable information', t => {
	t.is(types.style.release, null);
	t.true(isHumanReadable(types.style.name));
	t.true(isHumanReadable(types.style.summary));
});

test('refactor is defined as patch release with human-readable information', t => {
	t.is(types.refactor.release, 'patch');
	t.true(isHumanReadable(types.refactor.name));
	t.true(isHumanReadable(types.refactor.summary));
});

test('release is defined without release and with human-readable information', t => {
	t.is(types.release.release, null);
	t.true(isHumanReadable(types.release.name));
	t.true(isHumanReadable(types.release.summary));
});

test('chore is defined as patch release with human-readable information', t => {
	t.is(types.chore.release, 'patch');
	t.true(isHumanReadable(types.chore.name));
	t.true(isHumanReadable(types.chore.summary));
});
