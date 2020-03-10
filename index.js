'use strict';
const google = require('googleapis');
const output = require('./lib/output');
const {getOptions} = require('./lib/options-handler');
const pagespeedonline = new google.pagespeedonline_v5.Pagespeedonline({
  version: 'v5',
  auth: false
});

const psi = (url, options) => Promise.resolve().then(() => {
  if (!url) {
    throw new Error('URL required');
  }

  const opt = getOptions(url, options);

  return pagespeedonline.pagespeedapi.runpagespeed({
    ...opt,
    google: opt.nokey
  });
});

module.exports = psi;

module.exports.output = (url, options) => psi(url, options).then(data => output(getOptions(url, options), data.data));
