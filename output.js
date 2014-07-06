'use strict';
// Based on the reporting in grunt-pagespeed by James Cryer
// TODO: Refactor further as this still uses patterns that
// are based on Grunt conventions.

var prettyBytes = require('pretty-bytes');

exports.init = function () {
  var addSpacesToWords, bufferSpace, divder, exports, firstToUpperCaseAndAddSpace, generateRuleSetResults, generateScore, generateStatistics, score, threshold;
  score = 0;
  threshold = 70;
  exports = {};

  generateScore = function (strategy, response) {
    return 'URL:      ' + response.id + '\nStrategy: ' + strategy + ' \nScore:    ' + score;
  };

  generateRuleSetResults = function (rulesets) {
    var result, ruleImpact, title, _results;
    _results = [];
    for (title in rulesets) {
      result = rulesets[title];
      title = firstToUpperCaseAndAddSpace(title);
      title += bufferSpace(title);
      ruleImpact = Math.ceil(result.ruleImpact * 100) / 100;
      _results.push('' + title + '| ' + ruleImpact);
    }
    return _results.join('\n');
  };

  generateStatistics = function (statistics) {
    var result, title, _results;
    _results = [];
    for (title in statistics) {
      result = title.indexOf('Bytes') !== -1 ?
        prettyBytes(+statistics[title]) :
        statistics[title];
      title = firstToUpperCaseAndAddSpace(title);
      title += bufferSpace(title);
      _results.push('' + title + '| ' + result);
    }
    return _results.join('\n');
  };

  bufferSpace = function (msg, length) {
    var buffer = '';

    if (length === null) {
        length = 50;
    }
    if (length - msg.length > 0) {
      buffer = new Array(length - msg.length).join(' ');
    }
    return buffer;
  };

  firstToUpperCaseAndAddSpace = function (msg) {
    msg = msg.replace('Bytes', '');
    return msg.charAt(0).toUpperCase() + addSpacesToWords(msg.slice(1));
  };

  addSpacesToWords = function (msg) {
    return msg.replace(/([A-Z]+)/g, ' $1').replace(/([A-Z][a-z])/g, '$1');
  };

  divder = function () {
    return '\n' + new Array(65).join('-') + '\n';
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
        divder(),
        generateScore(parameters.strategy, response),
        generateStatistics(response.pageStats),
        divder(),
        generateRuleSetResults(response.formattedResults.ruleResults),
        divder()
      ].join('\n')
    );

    if (response.score < threshold) {
      throw new Error('Threshold of ' + threshold + ' not met with score of ' + response.score);
    }

    return done();
  };

  return exports;
};
