'use strict';
module.exports = function (overview, statistics, ruleSetResults, threshold) {
  var outputTest = function (overview, threshold) {
    var score = overview[1].value;
    var result = score < threshold ? 'not ok' : 'ok';
    return result + ' 1 - psi';
  };

  return [
    'TAP version 13',
    '1..1',
    outputTest(overview, threshold)
  ].join('\n');
};
