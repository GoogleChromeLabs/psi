'use strict';
const {google} = require('googleapis');
const prependHttp = require('prepend-http');
const output = require('./lib/output');

const pagespeedonline = google.pagespeedonline('v4');

function handleOpts(url, opts) {
  opts = Object.assign({strategy: 'mobile'}, opts);
  opts.nokey = opts.key === undefined;
  opts.url = prependHttp(url);
  return opts;
}

const psi = (url, opts) => Promise.resolve().then(() => {
  if (!url) {
    throw new Error('URL required');
  }

  return pagespeedonline.pagespeedapi.runpagespeed(handleOpts(url, opts));
});

module.exports = psi;

module.exports.output = (url, opts) => psi(url, opts).then(data => output(handleOpts(url, opts), data));
