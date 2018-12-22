const commitTypes = require('commit-types-peakfijn');
const config = require('@commitlint/config-conventional');

config.rules['header-max-length'] = [2, 'always', 80];
config.rules['scope-empty'] = [2, 'always'];
config.rules['subject-min-length'] = [2, 'always', 20];
config.rules['type-enum'] = [2, 'always', Object.keys(commitTypes)];

module.exports = config;
