'use strict';
const { google } = require('googleapis');
const pify = require('pify');
const output = require('./lib/output');
const {getOptions} = require('./lib/options-handler');
const pagespeedonline = new google.pagespeedonline_v5.Pagespeedonline();

const psi = (url, options) => Promise.resolve().then(() => {
  if (!url) {
    throw new Error('URL required');
  }

  return pagespeedonline.pagespeedapi.runpagespeed(getOptions(url, options));
});

module.exports = psi;

module.exports.output = (url, options) => psi(url, options).then(data => output(getOptions(url, options), data.data));
