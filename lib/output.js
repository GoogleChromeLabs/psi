'use strict';
var prettyBytes = require('pretty-bytes');
var THRESHOLD = 70;

function overview(url, strategy, score) {
  var ret = [];

  ret.push({
    label: 'URL',
    value: url
  });

  ret.push({
    label: 'Score',
    value: score
  });

  ret.push({
    label: 'Strategy',
    value: strategy
  });

  return ret;
}

function ruleSetResults(rulesets) {
  var ret = [];

  for (var title in rulesets) {
    ret.push({
      label: title,
      value: Math.ceil(rulesets[title].ruleImpact * 100) / 100
    });
  }

  return ret;
}

function statistics(stats) {
  var ret = [];

  for (var title in stats) {
    ret.push({
      label: title,
      value: title.indexOf('Bytes') !== -1 ? prettyBytes(Number(stats[title])) : stats[title]
    });
  }

  return ret;
}

function getReporter(format) {
  format = ['cli', 'json', 'tap'].indexOf(format) === -1 ? 'cli' : format;
  return require('./formats/' + format);
}

module.exports = function (parameters, response) {
  var renderer = getReporter(parameters.format);
  var threshold = parameters.threshold || THRESHOLD;

  console.log(renderer(
    overview(response.id, parameters.strategy, response.score),
    statistics(response.pageStats),
    ruleSetResults(response.formattedResults.ruleResults),
    threshold
  ));

  if (response.score < threshold) {
    var err = new Error('Threshold of ' + threshold + ' not met with score of ' + response.score);
    err.noStack = true;
  }
};
