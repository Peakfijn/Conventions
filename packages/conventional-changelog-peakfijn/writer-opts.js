'use strict';

const angularPreset = require('conventional-changelog-angular');
const commitTypes = require('commit-types-peakfijn');
const Q = require('q');

module.exports = Q.all([angularPreset])
	.spread(function (convention) {
		const writer = convention.writerOpts;

		writer.transform = function (commit, context) {
			const typeInfo = commitTypes[commit.type];
			const issues = [];

			if (typeInfo && typeInfo.name) {
				commit.type = typeInfo.name;
			} else {
				return;
			}

			if (commit.scope === '*') {
				commit.scope = '';
			}

			if (typeof commit.hash === 'string') {
				commit.hash = commit.hash.substring(0, 7);
			}

			if (typeof commit.subject === 'string') {
				let url = context.repository
					? `${context.host}/${context.owner}/${context.repository}`
					: context.repoUrl;

				if (url) {
					url = `${url}/issues/`;
					// Issue URLs.
					commit.subject = commit.subject.replace(/#([0-9]+)/g, (_, issue) => {
						issues.push(issue);

						return `[#${issue}](${url}${issue})`;
					});
				}

				if (context.host) {
					commit.subject = commit.subject.replace(
						/\B@([a-z0-9](?:-?[a-z0-9]){0,38})/g,
						`[@$1](${context.host}/$1)`
					);
				}
			}

			commit.references = commit.references.filter(reference => issues.indexOf(reference.issue) < 0);

			return commit;
		};

		return writer;
	});
