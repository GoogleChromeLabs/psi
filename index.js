'use strict';
var Promise = require('pinkie-promise');
var googleapis = require('googleapis');
var prependHttp = require('prepend-http');
var objectAssign = require('object-assign');
var pagespeed = googleapis.pagespeedonline('v2').pagespeedapi.runpagespeed;
var output = require('./lib/output');

function handleOpts(url, opts) {
  opts = objectAssign({strategy: 'mobile'}, opts);
  opts.nokey = opts.key === undefined;
  opts.url = prependHttp(url);
  return opts;
}

var psi = module.exports = function (url, opts) {
  return new Promise(function (resolve, reject) {
    if (typeof opts !== 'object') {
      opts = {};
    }

    if (!url) {
      throw new Error('URL required');
    }

    pagespeed(handleOpts(url, opts), function (err, response) {
      if (err) {
        err.noStack = true;
        reject(err);
        return;
      }

      resolve(response);
    });
  });
};

module.exports.output = function (url, opts) {
  if (typeof opts !== 'object') {
    opts = {};
  }

  return psi(url, opts).then(function (data) {
    return output(handleOpts(url, opts), data);
  });
};
