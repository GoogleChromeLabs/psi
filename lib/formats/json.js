'use strict';
var _ = require('lodash');
var utils = require('../utils');

exports.render = function (overview, statistics, ruleSetResults) {
  var mapSection = function (section) {
    return utils.firstToUpperCaseAndAddSpace(section.label);
  };

  var zip = function (section, labelMapping) {
    return _.zipObject(_.map(section, labelMapping), _.map(section, 'value'));
  };

  overview = zip(overview, 'label');
  statistics = zip(statistics, mapSection);
  ruleSetResults = zip(ruleSetResults, mapSection);

  console.log(JSON.stringify({
   'overview': overview,
   'statistics': statistics,
   'ruleResults': ruleSetResults
  }, undefined, 2));
};
