'use strict';

const zip = section => section.reduce((acc, current) => {
  const {label, value} = current;
  acc[label] = value;
  return acc;
}, {});

module.exports = (overview, statistics, ruleSetResults, opportunities) => {
  return JSON.stringify({
    overview: zip(overview),
    statistics: zip(statistics),
    ruleResults: zip(ruleSetResults),
    opportunities: zip(opportunities)
  }, null, 2);
};
