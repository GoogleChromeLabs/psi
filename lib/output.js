'use strict';
const querystring = require('querystring');
const prettyBytes = require('pretty-bytes');
const sortOn = require('sort-on');
const humanizeUrl = require('humanize-url');
const Download = require('download');
const pify = require('pify');

const THRESHOLD = 70;
const RESOURCE_URL = 'https://developers.google.com/speed/pagespeed/insights/optimizeContents?';

function overview(url, strategy, scores) {
  const ret = [];

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
  const ret = [];

  for (const title in rulesets) {
    if (Object.prototype.hasOwnProperty.call(rulesets, title)) {
      ret.push({
        label: title,
        value: Math.ceil(rulesets[title].ruleImpact * 100) / 100
      });
    }
  }

  return sortOn(ret, 'label');
}

function statistics(stats) {
  const ret = [];

  for (const title in stats) {
    if (Object.prototype.hasOwnProperty.call(stats, title)) {
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
  return require(`./formats/${format}`); // eslint-disable-line import/no-dynamic-require
}

module.exports = (parameters, response) => {
  return Promise.resolve().then(() => {
    const renderer = getReporter(parameters.format);
    const threshold = typeof parameters.threshold === 'number' ? parameters.threshold : THRESHOLD;
    const optimizedResourceURL = RESOURCE_URL + querystring.stringify({url: response.id, strategy: parameters.strategy});

    console.log(renderer(
      overview(humanizeUrl(response.id), parameters.strategy, response.ruleGroups),
      statistics(response.pageStats),
      ruleSetResults(response.formattedResults.ruleResults),
      threshold
    ));

    if (parameters.optimized) {
      console.log('\nHere are your optimized images:', humanizeUrl(optimizedResourceURL));
    }

    if (response.ruleGroups.SPEED.score < threshold) {
      const error = new Error(`Threshold of ${threshold} not met with score of ${response.ruleGroups.SPEED.score}`);
      error.noStack = true;
      throw error;
    }

    if (parameters.download) {
      const download = new Download()
        .get(optimizedResourceURL)
        .dest('.')
        .rename('./optimized.zip');

      return pify(download.run.bind(download))();
    }
  });
};
