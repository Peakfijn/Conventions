const angularPreset = require('conventional-changelog-angular');
const peakfijnWriterOps = require('./writer-opts');
const Q = require('q');

module.exports = Q.all([angularPreset, peakfijnWriterOps])
	.spread(function (convention, writer) {
		convention.writerOpts = writer;
		convention.conventionalChangelog.writerOpts = writer;

		return convention;
	});
