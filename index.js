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

    try {
      output(handleOpts(url, opts), data);
    } catch (err) {
      cb(err);
      return;
    }

    cb();
  });
};
