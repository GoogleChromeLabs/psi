'use strict';
const {google} = require('googleapis');
const pify = require('pify');
const output = require('./lib/output');
const {getOptions} = require('./lib/options-handler');

const {runpagespeed} = pify(google.pagespeedonline('v5').pagespeedapi);

const psi = (url, options) => Promise.resolve().then(() => {
  if (!url) {
    throw new Error('URL required');
  }

  return runpagespeed(getOptions(url, options));
});

module.exports = psi;

module.exports.output = (url, options) => psi(url, options).then(data => output(getOptions(url, options), data.data));
