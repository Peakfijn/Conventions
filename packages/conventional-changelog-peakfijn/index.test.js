import test from 'ava';
import { cloneDeep, isEqual } from 'lodash';
import angularPreset from 'conventional-changelog-angular';
import customWriter from './writer-opts';
import peakfijnPreset from '.';

test('returns peakfijn preset with custom writer', async t => {
	const peakfijn = await peakfijnPreset;
	const writer = await customWriter;

	t.is(peakfijn.writerOpts, writer);
	t.is(peakfijn.conventionalChangelog.writerOpts, writer);
});

test('returns peakfijn preset which is inherited from angular', async t => {
	const angular = cloneDeep(await angularPreset);
	const peakfijn = cloneDeep(await peakfijnPreset);

	delete angular.writer;
	delete peakfijn.writer;

	delete angular.conventionalChangelog.writerOpts;
	delete peakfijn.conventionalChangelog.writerOpts;

	t.true(isEqual(angular, peakfijn));
});
