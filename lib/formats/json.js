'use strict';
var _ = require('lodash');

module.exports = function (overview, statistics, ruleSetResults) {
  var mapSection = function (section) {
    return section.label;
  };

  var zip = function (section, labelMapping) {
    return _.zipObject(_.map(section, labelMapping), _.map(section, 'value'));
  };

  overview = zip(overview, 'label');
  statistics = zip(statistics, mapSection);
  ruleSetResults = zip(ruleSetResults, mapSection);

  return JSON.stringify({
   'overview': overview,
   'statistics': statistics,
   'ruleResults': ruleSetResults
  }, null, 2);
};
