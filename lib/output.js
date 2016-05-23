'use strict';
var Promise = require('pinkie-promise');
var prettyBytes = require('pretty-bytes');
var sortOn = require('sort-on');
var humanizeUrl = require('humanize-url');
var Download = require('download');
var querystring = require('querystring');
var pify = require('pify');
var THRESHOLD = 70;
var RESOURCE_URL = 'https://developers.google.com/speed/pagespeed/insights/optimizeContents?';

function overview(url, strategy, scores) {
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
    label: 'Speed',
    value: scores.SPEED.score
  });

  if (scores.USABILITY !== undefined) {
    ret.push({
      label: 'Usability',
      value: scores.USABILITY.score
    });
  }

  return ret;
}

function ruleSetResults(rulesets) {
  var ret = [];

  for (var title in rulesets) {
    if (rulesets.hasOwnProperty(title)) {
      ret.push({
        label: title,
        value: Math.ceil(rulesets[title].ruleImpact * 100) / 100
      });
    }
  }

  return sortOn(ret, 'label');
}

function statistics(stats) {
  var ret = [];

  for (var title in stats) {
    if (stats.hasOwnProperty(title)) {
      ret.push({
        label: title,
        value: title.indexOf('Bytes') === -1 ? stats[title] : prettyBytes(Number(stats[title]))
      });
    }
  }

  return sortOn(ret, 'label');
}

function getReporter(format) {
  format = ['cli', 'json', 'tap'].indexOf(format) === -1 ? 'cli' : format;
  return require('./formats/' + format);
}

module.exports = function (parameters, response) {
  return Promise.resolve().then(function () {
    var renderer = getReporter(parameters.format);
    var threshold = parameters.threshold || THRESHOLD;
    var optimizedResourceURL = RESOURCE_URL + querystring.stringify({url: response.id, strategy: parameters.strategy});

    console.log(renderer(
      overview(humanizeUrl(response.id), parameters.strategy, response.ruleGroups),
      statistics(response.pageStats),
      ruleSetResults(response.formattedResults.ruleResults),
      threshold
    ));

    if (parameters.optimized) {
      console.log('\nHere are your optimized images: ', humanizeUrl(optimizedResourceURL));
    }

    if (response.ruleGroups.SPEED.score < threshold) {
      var err = new Error('Threshold of ' + threshold + ' not met with score of ' + response.ruleGroups.SPEED.score);
      throw err;
    }

    if (parameters.download) {
      var download = new Download()
        .get(optimizedResourceURL)
        .dest('.')
        .rename('./optimized.zip');

      return pify(download.run.bind(download), Promise)();
    }
  });
};
