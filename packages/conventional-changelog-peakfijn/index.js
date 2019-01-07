const Q = require('q');
const angularPreset = require('conventional-changelog-angular');
const peakfijnWriterOps = require('./writer-opts');

module.exports = Q.all([angularPreset, peakfijnWriterOps])
	.spread((convention, writer) => {
		convention.writerOpts = writer;
		convention.conventionalChangelog.writerOpts = writer;

		return convention;
	});
