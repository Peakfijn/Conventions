module.exports = {
	branch: 'develop',
	tagFormat: '${version}', // eslint-disable-line no-template-curly-in-string
	plugins: [
		[
			'@semantic-release/commit-analyzer',
			{
				preset: 'peakfijn',
				releaseRules: 'release-rules-peakfijn',
			},
		],
		[
			'@semantic-release/release-notes-generator',
			{
				preset: 'peakfijn',
			},
		],
		'@semantic-release/changelog',
		'@semantic-release/npm',
		[
			'@semantic-release/git',
			{
				// eslint-disable-next-line no-template-curly-in-string
				message: 'release: create new version ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
				assets: [
					'CHANGELOG.md',
					'package.json',
					'package-lock.json',
				],
			},
		],
		'@semantic-release/github',
	],
};
