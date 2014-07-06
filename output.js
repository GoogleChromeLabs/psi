'use strict';
// Based on the reporting in grunt-pagespeed by James Cryer
// TODO: Refactor further as this still uses patterns that
// are based on Grunt conventions.

var prettyBytes = require('pretty-bytes');
var utils = require('./lib/utils');

exports.init = function () {

  var score = 0,
      threshold = 70,
      exports = {};

  var generateScore = function (strategy, response) {
    return 'URL:      ' + response.id + '\nStrategy: ' + strategy + ' \nScore:    ' + score;
  };

  var generateRuleSetResults = function (rulesets) {
    var result, ruleImpact, title, _results;
    _results = [];
    for (title in rulesets) {
      result = rulesets[title];
      title = utils.firstToUpperCaseAndAddSpace(title);
      title += utils.buffer(title);
      ruleImpact = Math.ceil(result.ruleImpact * 100) / 100;
      _results.push('' + title + '| ' + ruleImpact);
    }
    return _results.join('\n');
  };

  var generateStatistics = function (statistics) {
    var result, title, _results;
    _results = [];
    for (title in statistics) {
      result = title.indexOf('Bytes') !== -1 ?
        prettyBytes(+statistics[title]) :
        statistics[title];
      title = utils.firstToUpperCaseAndAddSpace(title);
      title += utils.buffer(title);
      _results.push('' + title + '| ' + result);
    }
    return _results.join('\n');
  };

  exports.threshold = function (limit) {
    threshold = limit;
    return threshold;
  };

  exports.process = function (parameters, response, done) {
    var logger  = console.log;
    done        = done || function () {};
    threshold   = parameters.threshold || threshold;

    logger(
      [
        utils.divider,
        generateScore(parameters.strategy, response),
        generateStatistics(response.pageStats),
        utils.divider,
        generateRuleSetResults(response.formattedResults.ruleResults),
        utils.divider
      ].join('\n')
    );

    if (response.score < threshold) {
      throw new Error('Threshold of ' + threshold + ' not met with score of ' + response.score);
    }
    return done();
  };

  return exports;
};
