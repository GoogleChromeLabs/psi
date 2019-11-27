const prependHttp = require('prepend-http');

const THRESHOLD = 70;

const getOptions = (url, options) => {
  options = Object.assign({strategy: 'mobile'}, options);
  options.nokey = options.key === undefined;
  options.url = prependHttp(url);
  return options;
};

const getThreshold = threshold => (typeof threshold === 'number' && threshold && threshold < 100) ? threshold : THRESHOLD;

const getReporter = format => ['cli', 'json', 'tap'].includes(format) ? format : 'cli';

module.exports = {
  getOptions,
  getThreshold,
  getReporter
};
