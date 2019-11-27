'use strict';
const sortOn = require('sort-on');
const humanizeUrl = require('humanize-url');
const prettyMs = require('pretty-ms');
const {getThreshold, getReporter} = require('./../lib/options-handler');

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
    value: convertToPercentum(scores.categories.performance.score)
  });

  return ret;
}

const fieldData = stats => {
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
  return rules.filter(rule => {
    return rule.group === group;
  });
};

const labData = lighthouseResult => {
  const ret = [];

  const rules = getRules(lighthouseResult.categories.performance.auditRefs, 'metrics');

  rules.forEach(rule => {
    const {audits} = lighthouseResult;
    ret.push({
      label: audits[rule.id].title,
      value: audits[rule.id].displayValue.replace(/\s/g, '')
    });
  });

  return sortOn(ret, 'label');
};

const opportunities = lighthouseResult => {
  const ret = [];

  const rules = getRules(lighthouseResult.categories.performance.auditRefs, 'load-opportunities');

  const opportunityRules = rules.filter(rule => {
    const {details} = lighthouseResult.audits[rule.id];
    return details.type === 'opportunity' && details.overallSavingsMs > 0;
  });

  for (const rule of opportunityRules) {
    const {audits} = lighthouseResult;
    ret.push({
      label: audits[rule.id].title,
      value: prettyMs(audits[rule.id].details.overallSavingsMs)
    });
  }

  return sortOn(ret, 'label');
};

const convertToPercentum = num => num * 100;

module.exports = (parameters, response) => {
  return Promise.resolve().then(() => {
    const renderer = require(`./formats/${getReporter(parameters.format)}`);
    const threshold = getThreshold(parameters.threshold);
    const {lighthouseResult, loadingExperience, id} = response;

    console.log(renderer(
      overview(humanizeUrl(id), parameters.strategy, lighthouseResult),
      fieldData(loadingExperience.metrics),
      labData(lighthouseResult),
      opportunities(lighthouseResult),
      threshold
    ));

    const score = convertToPercentum(lighthouseResult.categories.performance.score);
    if (score < threshold) {
      const error = new Error(`Threshold of ${threshold} not met with score of ${score}`);
      error.noStack = true;
      throw error;
    }
  });
};
