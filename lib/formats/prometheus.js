'use strict';
const _ = require('lodash');
const bytes = require('bytes');
const utils = require('../utils');

module.exports = (overview, statistics, ruleSetResults) => {
  const renderSection = (item, prefix) => {
    const metric = prefix + utils.camelToSnake(item.label);
    const value = metric.endsWith('_bytes') ? bytes(item.value) : item.value;

    if (typeof value !== 'number') {
      return null;
    }

    return [
      '# TYPE ' + metric + ' gauge',
      metric + ' ' + value
    ].join('\n');
  };

  const renderOverview = section => { return renderSection(section, 'psi_overview_') };
  const renderStats = section => { return renderSection(section, 'psi_stats_') };
  const renderRules = section => { return renderSection(section, 'psi_rules_') };

  return [
    _.map(overview, renderOverview).join('\n'),
    _.map(statistics, renderStats).join('\n'),
    _.map(ruleSetResults.filter(x => x.value > 0), renderRules).join('\n'),
  ].join('\n').trim();
};
