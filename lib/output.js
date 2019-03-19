'use strict';
const fs = require('fs');
const querystring = require('querystring');
const download = require('download');
const prettyBytes = require('pretty-bytes');
const sortOn = require('sort-on');
const humanizeUrl = require('humanize-url');
const prettyMs = require('pretty-ms');

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
    label: 'Performance',
    value: reversePercentage(scores.categories.performance.score)
  });

  return ret;
}

const fieldData = (stats) => {
  const ret = [];

  for (const title in stats) {
    if (Object.prototype.hasOwnProperty.call(stats, title)) {
      ret.push({
        label: title,
        value: prettyMs(stats[title].percentile)
      });
    }
  }

  return sortOn(ret, 'label');
};

const getRules = (rules, group) => {
  return rules.filter((rule) => {
    return rule.group === group;
  });
};

const labData = lighthouseResult => {
  const ret = [];

  const rules = getRules(lighthouseResult.categories.performance.auditRefs, 'metrics');

  rules.forEach( (rule) => {
    const {audits} =  lighthouseResult;
    ret.push({
        label: audits[rule.id].title,
        value: audits[rule.id].displayValue
      });
  });

  return sortOn(ret, 'label');
};

const opportunities = lighthouseResult => {
  const ret = [];

  const rules = getRules(lighthouseResult.categories.performance.auditRefs, 'load-opportunities');

  const oppRule = rules.filter((opportunityRule) => {
    let ruleDetails = lighthouseResult.audits[opportunityRule.id].details;
    return ruleDetails.overallSavingsMs !== undefined && ruleDetails.overallSavingsMs > 0 && ruleDetails.type === 'opportunity';
  });

  oppRule.forEach((rule) => {
    const {audits} = lighthouseResult;
    ret.push({
      label: audits[rule.id].title,
      value: prettyMs(audits[rule.id].details.overallSavingsMs)
    });
  });

  return sortOn(ret, 'label');
};

function getReporter(format) {
  format = ['cli', 'json', 'tap'].indexOf(format) === -1 ? 'cli' : format;
  return require(`./formats/${format}`);
}

const reversePercentage = (num) => num * 100;

function getThreshold(threshold) {
  let value = THRESHOLD;
  if (typeof threshold === 'number' && threshold && threshold < 100) {
    value = threshold;
  } else {
    value = THRESHOLD;
  }

  return value;
}

module.exports = (parameters, response) => {
  return Promise.resolve().then(() => {
    const renderer = getReporter(parameters.format);
    const threshold = getThreshold(parameters.threshold);
    const { lighthouseResult, loadingExperience, id } = response;
    const optimizedResourceURL = RESOURCE_URL + querystring.stringify({url: id, strategy: parameters.strategy});

    console.log(renderer(
      overview(humanizeUrl(id), parameters.strategy, lighthouseResult),
      fieldData(loadingExperience.metrics),
      labData(lighthouseResult),
      opportunities(lighthouseResult),
      threshold
    ));

    if (parameters.optimized) {
      console.log('\nHere are your optimized images:', humanizeUrl(optimizedResourceURL));
    }

    const score = reversePercentage(response.lighthouseResult.categories.performance.score);
    if (score < threshold) {
      const error = new Error(`Threshold of ${threshold} not met with score of ${score}`);
      error.noStack = true;
      throw error;
    }

    if (parameters.download) {
      return download(optimizedResourceURL).then(data => {
        fs.writeFileSync('./optimized.zip', data);
      });
    }
  });
};
