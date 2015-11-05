'use strict';
var Promise = require('pinkie-promise');
var googleapis = require('googleapis');
var prependHttp = require('prepend-http');
var objectAssign = require('object-assign');
var pify = require('pify');
var pagespeed = pify(googleapis.pagespeedonline('v2').pagespeedapi.runpagespeed, Promise);
var output = require('./lib/output');

function handleOpts(url, opts) {
  opts = objectAssign({strategy: 'mobile'}, opts);
  opts.nokey = opts.key === undefined;
  opts.url = prependHttp(url);
  return opts;
}

var psi = module.exports = function (url, opts) {
  return Promise.resolve().then(function () {
    if (!url) {
      throw new Error('URL required');
    }

    return pagespeed(handleOpts(url, opts));
  });
};

module.exports.output = function (url, opts) {
  return psi(url, opts).then(function (data) {
    return output(handleOpts(url, opts), data);
  });
};
