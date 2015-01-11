'use strict';
var _ = require('lodash');
var chalk = require('chalk');
var utils = require('../utils');

module.exports = function (overview, statistics, ruleSetResults) {
  var renderOverview = function (item) {
    var color = item.label === 'Score' ? utils.scoreColor(item.value) : chalk.cyan;
    return item.label + ':' + utils.buffer(item.label, 11) + color(item.value);
  };

  var renderSection = function (item) {
    return utils.labelize(item.label) + chalk.cyan(item.value);
  };

  return [
    utils.divider,
    _.map(overview, renderOverview).join('\n') + '\n',
    _.map(statistics, renderSection).join('\n'),
    '',
    _.map(ruleSetResults.filter(function (el) {
      return el.value > 0;
    }), renderSection).join('\n'),
    utils.divider
  ].join('\n');
};
