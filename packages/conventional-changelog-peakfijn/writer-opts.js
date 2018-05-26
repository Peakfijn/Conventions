'use strict';

const angularPreset = require('conventional-changelog-angular');
const commitTypes = require('commit-types-peakfijn');
const Q = require('q');

module.exports = Q.all([angularPreset])
	.spread(function (convention) {
		const writer = convention.writerOpts;
		const writerTransform = convention.writerOpts.transform;

		writer.transform = function (commit, context) {
			if (commitTypes[commit.type]) {
				commit.type = commitTypes[commit.type].name;
			}

			return writerTransform(commit, context);
		};

		return writer;
	});
