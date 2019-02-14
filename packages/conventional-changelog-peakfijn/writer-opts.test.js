import test from 'ava';
import { cloneDeep, isEqual } from 'lodash';
import { sync as commitParser } from 'conventional-commits-parser';
import angularPreset from 'conventional-changelog-angular';
import commitTypes from 'commit-types-peakfijn';
import customWriter from './writer-opts';

const defaultContext = {
	host: 'https://github.com',
	owner: 'peakfijn',
	repository: 'conventions',
	repoUrl: 'https://github.com/peakfijn/conventions',
};

const parseCommit = async commit => {
	const angular = await angularPreset;
	const parsed = commitParser(commit, angular.parserOpts);
	parsed.raw = commit;

	return parsed;
};

const transformCommit = async (commit, context = defaultContext) => (
	(await customWriter).transform(cloneDeep(commit), context)
);

test('returns custom writer which is inherited from angular', async t => {
	const angular = cloneDeep((await angularPreset).writerOpts);
	const writer = cloneDeep(await customWriter);

	delete angular.transform;
	delete writer.transform;

	t.true(isEqual(angular, writer));
});

test('#transform type with peakfijn commit type', async t => {
	const commit = await parseCommit('feature: add amazing new feature');
	const result = await transformCommit(commit);

	t.is(commit.type, 'feature');
	t.is(result.type, commitTypes.feature.name);
});

test('#transform filters asteric scope', async t => {
	const commit = await parseCommit('fix(*): remove asterisk-scope from changelog');
	const result = await transformCommit(commit);

	t.is(commit.scope, '*');
	t.is(result.scope, '');
});

test('#transform hash is truncated to 7 characters', async t => {
	const commit = await parseCommit('refactor: truncate hash to short hash');
	const result = await transformCommit({ ...commit, hash: 'abcdefghijklmnopqrstuvwxyz012345689abcde' });

	t.is(result.hash, 'abcdefg');
});

test('#transform adds link to issue within subject', async t => {
	const commit = await parseCommit('refactor: change the url for issue references (#1337)');
	const result = await transformCommit(commit);

	t.is(result.subject, 'change the url for issue references ([#1337](https://github.com/peakfijn/conventions/issues/1337))');
});

test('#transform filters references which are not included in subject issues', async t => {
	const commit = await parseCommit('fix: filter references by subject issues (#5)\n\nfixes #3\nfixes #5\n');
	const result = await transformCommit(commit);

	t.is(commit.references.length, 3);
	t.is(result.references.length, 1);
	t.is(result.references[0].issue, '3');
});
