'use strict';
const _ = require('lodash');
const chalk = require('chalk');
const utils = require('../utils');

module.exports = (overview, statistics, ruleSetResults) => {
  const renderOverview = item => {
    const color = (item.label === 'Speed' || item.label === 'Usability') ? utils.scoreColor(item.value) : chalk.cyan;
    return item.label + ':' + utils.buffer(item.label, 11) + color(item.value);
  };

  const renderSection = item => utils.labelize(item.label) + chalk.cyan(item.value);

  return [
    utils.divider,
    _.map(overview, renderOverview).join('\n') + '\n',
    _.map(statistics, renderSection).join('\n'),
    '',
    _.map(ruleSetResults.filter(x => x.value > 0), renderSection).join('\n'),
    utils.divider
  ].join('\n');
};
