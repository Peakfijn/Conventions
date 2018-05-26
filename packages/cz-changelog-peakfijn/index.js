'use strict';

const commitTypes = require('commit-types-peakfijn');
const commitlint = require('commitlint-config-peakfijn');

const getScopes = require('./get-scopes');
const getTypes = require('./get-types');

module.exports = {
	prompter: function (cz, commit) {
		const scopeInfo = getScopes(commitlint);
		const typeInfo = getTypes(commitlint);

		const questions = [
			{
				type: 'list',
				name: 'type',
				message: 'What is the most appropiate change type? (in priority)\n',
				choices: typeInfo.types,
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
				message: 'Provide any trello card or stackoverflow links: (press enter to skip)\n',
			},
		];

		cz.prompt(questions).then(function (answers) {
			const scope = answer.scope ? `(${answer.scope})` : '';
			const head = `${answer.type}${scope}: ${answer.subject.toLowerCase()}`;

			commit(`${head}\n\n${answer.body}\n\n${answer.footer}`.trim());
		});
	},
};
