'use strict';
var googleapis = require('googleapis');
var prependHttp = require('prepend-http');
var objectAssign = require('object-assign');
var pagespeed = googleapis.pagespeedonline('v1').pagespeedapi.runpagespeed;
var output = require('./lib/output');

function handleOpts(opts) {
  opts = objectAssign({
    strategy: 'mobile'
  }, opts);

  opts.nokey = opts.key === undefined;
  opts.url = prependHttp(opts.url);

  return opts;
}

var psi = module.exports = function (opts, cb) {
  if (!opts.url) {
    throw new Error('URL required');
  }

  pagespeed(handleOpts(opts), function (err, response) {
    if (err) {
      cb(err);
      return;
    }

    cb(err, response);
  });
};

module.exports.output = function (opts, cb) {
  cb = cb || function () {};
  opts = handleOpts(opts);

  psi(opts, function (err, data) {
    if (err) {
      cb(err);
      return;
    }

    output(opts, data);
    cb();
  });
};
