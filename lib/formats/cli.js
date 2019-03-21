'use strict';
const _ = require('lodash');
const chalk = require('chalk');
const utils = require('../utils');

const renderSection = item => utils.labelize(item.label) + chalk.cyan(item.value);
const setTitle = sectionName => (chalk.gray.underline(sectionName) + '\n');

const renderOverview = item => {
  const color = (item.label === 'Performance' || item.label === 'Usability') ? utils.scoreColor(item.value) : chalk.cyan;
  return item.label + ':' + utils.buffer(item.label, 14) + color(item.value);
};

module.exports = (overview, statistics, ruleSetResults, opportunities) => {
  return [
    utils.divider,
    setTitle('Summary'),
    _.map(overview, renderOverview).join('\n') + '\n',
    setTitle('Field Data'),
    _.map(statistics, renderSection).join('\n'),
    '',
    setTitle('Lab Data'),
    _.map(ruleSetResults, renderSection).join('\n'),
    '',
    setTitle('Opportunities'),
    _.map(opportunities, renderSection).join('\n'),
    utils.divider
  ].join('\n');
};
