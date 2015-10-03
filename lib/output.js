'use strict';
var prettyBytes = require('pretty-bytes');
var sortOn = require('sort-on');
var humanizeUrl = require('humanize-url');
var Download = require('download');
var querystring = require('querystring');
var writeFileSync = require('fs').writeFileSync;
var THRESHOLD = 70;
var RESOURCE_URL = 'https://developers.google.com/speed/pagespeed/insights/optimizeContents?';

function overview(url, strategy, score) {
  var ret = [];

  ret.push({
    label: 'URL',
    value: url
  });

  ret.push({
    label: 'Strategy',
    value: strategy
  });

  ret.push({
    label: 'Score',
    value: score
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

  return sortOn(ret, 'label');
}

function statistics(stats) {
  var ret = [];

  for (var title in stats) {
    ret.push({
      label: title,
      value: title.indexOf('Bytes') !== -1 ? prettyBytes(Number(stats[title])) : stats[title]
    });
  }

  return sortOn(ret, 'label');
}

function getReporter(format) {
  format = ['cli', 'json', 'tap'].indexOf(format) === -1 ? 'cli' : format;
  return require('./formats/' + format);
}

module.exports = function (parameters, response, cb) {
  var renderer = getReporter(parameters.format);
  var threshold = parameters.threshold || THRESHOLD;
  var optimizedResoruceURL = RESOURCE_URL + querystring.stringify({url: response.id, strategy: parameters.strategy})

  console.log(renderer(
    overview(humanizeUrl(response.id), parameters.strategy, response.ruleGroups.SPEED.score),
    statistics(response.pageStats),
    ruleSetResults(response.formattedResults.ruleResults),
    threshold
  ));

  if (parameters.optimized) {
    console.log('\nHere are your optimized images: ', humanizeUrl(optimizedResoruceURL));
  }

  if (response.ruleGroups.SPEED.score < threshold) {
    var err = new Error('Threshold of ' + threshold + ' not met with score of ' + response.ruleGroups.SPEED.score);
    return cb(err);
  }

  if (parameters.download) {
      new Download()
          .get(optimizedResoruceURL)
          .dest('.')
          .rename('./optimized.zip')
          .run(cb);
  }
};
