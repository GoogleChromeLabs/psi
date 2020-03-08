'use strict';

const chalk = require('chalk');
const utils = require('../utils');

const renderSection = item => utils.labelize(item.label) + chalk.cyan(item.value);
const setTitle = sectionName => (chalk.gray.underline(sectionName) + '\n');
const renderInfo = str => (chalk.white(str) + '\n');

const renderOverview = item => {
  const color = (item.label === 'Performance') ? utils.scoreColor(item.value) : chalk.cyan;
  return item.label + ':' + utils.buffer(item.label, 14) + color(item.value);
};

const getDataOutput = (data, msg = 'No info provided') => data.length > 0 ?
  data.map(renderSection).join('\n') :
  renderInfo(msg);

module.exports = (overview, statistics, ruleSetResults, opportunities) => {
  return [
    utils.divider,
    setTitle('Summary'),
    overview.map(renderOverview).join('\n') + '\n',
    setTitle('Field Data'),
    getDataOutput(
      statistics,
      'The Chrome User Experience Report does not have sufficient real-world speed data for this page.'
    ),
    '',
    setTitle('Lab Data'),
    ruleSetResults.map(renderSection).join('\n'),
    '',
    setTitle('Opportunities'),
    getDataOutput(
      opportunities,
      'No opportunities provided.'
    ),
    utils.divider
  ].join('\n');
};
