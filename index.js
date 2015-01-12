'use strict';
var googleapis = require('googleapis');
var prependHttp = require('prepend-http');
var objectAssign = require('object-assign');
var pagespeed = googleapis.pagespeedonline('v1').pagespeedapi.runpagespeed;
var output = require('./lib/output');

function handleOpts(url, opts) {
  opts = objectAssign({strategy: 'mobile'}, opts);
  opts.nokey = opts.key === undefined;
  opts.url = prependHttp(url);
  return opts;
}

var psi = module.exports = function (url, opts, cb) {
  if (typeof opts !== 'object') {
      cb = opts;
      opts = {};
  }

  if (!url) {
    throw new Error('URL required');
  }

  if (typeof cb !== 'function') {
    throw new Error('Callback required');
  }

  pagespeed(handleOpts(url, opts), function (err, response) {
    if (err) {
      // `googleapis` doesn't return an Error instance as it should
      // https://github.com/google/google-api-nodejs-client/issues/345
      err = new Error(err.message);
      err.noStack = true;
      cb(err);
      return;
    }

    cb(null, response);
  });
};

module.exports.output = function (url, opts, cb) {
  if (typeof opts !== 'object') {
      cb = opts;
      opts = {};
  }

  cb = cb || function () {};

  psi(url, opts, function (err, data) {
    if (err) {
      cb(err);
      return;
    }

    output(handleOpts(url, opts), data);
    cb();
  });
};
