module.exports = {
	branch: 'develop',
	tagFormat: '${version}',
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
				message: 'release: create new version ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
				assets: [
					'CHANGELOG.md',
					'package.json',
					'package-lock.json',
				],
			},
		],
		'@semantic-release/github',
	]
};
