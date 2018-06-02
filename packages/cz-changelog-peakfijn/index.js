'use strict';

const commitTypes = require('commit-types-peakfijn');
const commitlintLoad = require('@commitlint/load');
const commitlintLint = require('@commitlint/lint');

const { reportSummary, reportIsValid } = require('./commitlint-utils');
const getScopes = require('./get-scopes');
const getTypes = require('./get-types');

module.exports = {
	prompter: function (cz, commit) {
		commitlintLoad({ extends: ['peakfijn'] }).then(function (commitlintConfig) {
			const scopeInfo = getScopes(commitlintConfig);
			const typeInfo = getTypes(commitlintConfig);

			const questions = [
				{
					type: 'list',
					name: 'type',
					message: 'What is the most appropiate change type? (in priority)\n',
					choices: typeInfo.choices,
					when: typeInfo.enabled,
				},
				{
					type: 'list',
					name: 'scope',
					message: 'What is the scope of this change?\n',
					choices: scopeInfo.choices,
					when: scopeInfo.enabled,
				},
				{
					type: 'input',
					name: 'subject',
					message: 'Write a short description of the change: (imperative tense, no punctuation)\n',
				},
				{
					type: 'input',
					name: 'body',
					message: 'Provide a longer description of the change: (press enter to skip)\n',
				},
				{
					type: 'input',
					name: 'footer',
					message: 'Provide any trello card or stackoverflow links, separated by a space: (press enter to skip)\n',
				},
			];

			cz.prompt(questions).then(function (answers) {
				const scope = answers.scope ? `(${answers.scope})` : '';
				const head = `${answers.type}${scope}: ${answers.subject}`;
				const footer = (answers.footer || '').split(' ').join('\n');

				const commitMessage = `${head}\n\n${answers.body}\n\n${footer}`.trim();

				commitlintLint(commitMessage, commitlintConfig.rules).then(function (report) {
					if (reportIsValid(report)) {
						commit(commitMessage);
					} else {
						console.log(reportSummary(report));
					}
				});
			});
		});
	},
};
