'use strict';
const googleapis = require('googleapis');
const prependHttp = require('prepend-http');
const pify = require('pify');
const output = require('./lib/output');

const pagespeed = pify(googleapis.google.pagespeedonline('v4').pagespeedapi);

function handleOpts(url, options) {
  options = Object.assign({strategy: 'mobile'}, options);
  options.nokey = options.key === undefined;
  options.url = prependHttp(url);
  return options;
}

const psi = (url, options) => Promise.resolve().then(() => {
  if (!url) {
    throw new Error('URL required');
  }

  return pagespeed.runpagespeed(handleOpts(url, options));
});

module.exports = psi;

module.exports.output = (url, options) => psi(url, options).then(data => output(handleOpts(url, options), data.data));
