module.exports = {
	extends: [
		'./packages/commitlint-config-peakfijn',
	],
	rules: {
		'scope-empty': [
			0,
		],
		'scope-enum': [
			2,
			'always',
			[
				'changelog',
				'commitizen',
				'commitlint',
				'eslint',
				'semantic-release',
				'stylelint',
			],
		],
	},
	ignores: [
		// fix: ignore lockfile updates by greenkeeper
		commit => commit.startsWith('chore(package):'),
	],
};
