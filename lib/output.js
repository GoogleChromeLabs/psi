'use strict';
// Based on the reporting in grunt-pagespeed by James Cryer
// TODO: Refactor further as this still uses patterns that
// are based on Grunt conventions.
var prettyBytes = require('pretty-bytes');

exports.init = function () {
  /**
   * @var {int} default threshold
   */
  var threshold = 70;

  /**
   * Gather overview of PageSpeed results
   *
   * @param {String} url
   * @param {String} strategy
   * @param {String} score
   * @return array
   */
  var overview = function (url, strategy, score) {
    var _results = [];

    _results.push({label: 'URL', value: url});
    _results.push({label: 'Score', value: score});
    _results.push({label: 'Strategy', value: strategy});

    return _results;
  };

  /**
   * Gather and normalise rule results for PageSpeed result
   *
   * @param {Object} rulesets
   * @return array
   */
  var ruleSetResults = function (rulesets) {
    var title;
    var result;
    var ruleImpact;
    var _results = [];

    for (title in rulesets) {
      result = rulesets[title];
      ruleImpact = Math.ceil(result.ruleImpact * 100) / 100;
      _results.push({label: title, value: ruleImpact});
    }

    return _results;
  };

  /**
   * Gather and normalise statistics for PageSpeed result
   *
   * @param {Object} statistics
   * @return array
   */
  var statistics = function (statistics) {
    var title;
    var result;
    var _results = [];

    for (title in statistics) {
      result = title.indexOf('Bytes') !== -1 ?
      prettyBytes(Number(statistics[title])) :
      statistics[title];

      _results.push({label: title, value: result});
    }

    return _results;
  };

  /**
   * Loads the correct output format
   *
   * @param {String} formt
   * @return Function
   */
  var format = function (format) {
    if (['cli', 'json', 'tap'].indexOf(format) === -1) {
      format = 'cli';
    }

    return require('./formats/' + format).render;
  };

  return {
    process: function (parameters, response, done) {
      var renderer = format(parameters.format);

      done = done || function () {};
      threshold = parameters.threshold || threshold;

      renderer(
        overview(response.id, parameters.strategy, response.score),
        statistics(response.pageStats),
        ruleSetResults(response.formattedResults.ruleResults),
        threshold
      );

      if (response.score < threshold) {
        done(new Error('Threshold of ' + threshold + ' not met with score of ' + response.score));
        return;
      }

      done();
      return;
    }
  };
};
