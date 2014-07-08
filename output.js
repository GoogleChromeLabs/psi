'use strict';
// Based on the reporting in grunt-pagespeed by James Cryer
// TODO: Refactor further as this still uses patterns that
// are based on Grunt conventions.

var prettyBytes = require('pretty-bytes');
var chalk = require('chalk');
var utils = require('./lib/utils');

exports.init = function () {
  var threshold = 70;
  var exports = {};

  var generateScore = function (url, strategy, score) {
    var color = utils.scoreColor(score);

    score = 'Score:     ' + color(score);
    url = 'URL:       ' + chalk.cyan(url);
    strategy = 'Strategy:  ' + chalk.cyan(strategy);

    return [url, score, strategy].join('\n') + '\n';
  };

  var generateRuleSetResults = function (rulesets) {
    var result, ruleImpact, title;
    var _results = [];

    for (title in rulesets) {
      result = rulesets[title];
      ruleImpact = Math.ceil(result.ruleImpact * 100) / 100;
      _results.push(utils.labelize(title) + chalk.cyan(ruleImpact));
    }

    return _results.join('\n');
  };

  var generateStatistics = function (statistics) {
    var result, title;
    var _results = [];

    for (title in statistics) {
      result = title.indexOf('Bytes') !== -1 ?
        prettyBytes(+statistics[title]) :
        statistics[title];

      _results.push(utils.labelize(title) + chalk.cyan(result));
    }

    return _results.join('\n');
  };

  exports.threshold = function (limit) {
    threshold = limit;
    return threshold;
  };

  exports.process = function (parameters, response, done) {
    var logger = console.log;
    done = done || function () {};
    threshold = parameters.threshold || threshold;

    logger([
      utils.divider,
      generateScore(response.id, parameters.strategy, response.score),
      generateStatistics(response.pageStats),
      utils.labelize(''),
      generateRuleSetResults(response.formattedResults.ruleResults),
      utils.divider
    ].join('\n'));

    if (response.score < threshold) {
      throw new Error('Threshold of ' + threshold + ' not met with score of ' + response.score);
    }

    return done();
  };

  return exports;
};
