'use strict';
const _ = require('lodash');
const chalk = require('chalk');
const utils = require('../utils');

const renderSection = item => utils.labelize(item.label) + chalk.cyan(item.value);
const setTitle = sectionName => (chalk.gray.underline(sectionName) + '\n');
const renderInfo = str => (chalk.white(str) + '\n');

const renderOverview = item => {
  const color = (item.label === 'Performance') ? utils.scoreColor(item.value) : chalk.cyan;
  return item.label + ':' + utils.buffer(item.label, 14) + color(item.value);
};

const getFielDataOutput = statistics => statistics.length > 0 ?
  _.map(statistics, renderSection).join('\n') :
  renderInfo('The Chrome User Experience Report does not have sufficient real-world speed data for this page.');

module.exports = (overview, statistics, ruleSetResults, opportunities) => {
  return [
    utils.divider,
    setTitle('Summary'),
    _.map(overview, renderOverview).join('\n') + '\n',
    setTitle('Field Data'),
    getFielDataOutput(statistics),
    '',
    setTitle('Lab Data'),
    _.map(ruleSetResults, renderSection).join('\n'),
    '',
    setTitle('Opportunities'),
    _.map(opportunities, renderSection).join('\n'),
    utils.divider
  ].join('\n');
};
