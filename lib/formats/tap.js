'use strict';
module.exports = (overview, statistics, ruleSetResults, threshold) => {
  const outputTest = (overview, threshold) => {
    const score = overview[2].value;
    const result = score < threshold ? 'not ok' : 'ok';
    return `${result} 1 - psi`;
  };

  return [
    'TAP version 13',
    '1..1',
    outputTest(overview, threshold)
  ].join('\n');
};
