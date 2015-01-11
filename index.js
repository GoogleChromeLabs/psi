'use strict';
var googleapis = require('googleapis');
var prependHttp = require('prepend-http');
var objectAssign = require('object-assign');
var pagespeed = googleapis.pagespeedonline('v1').pagespeedapi.runpagespeed;
var output = require('./lib/output');

module.exports = function (opts, cb) {
  opts = objectAssign({
    strategy: 'mobile'
  }, opts);

  cb = cb || function () {};

  if (!opts.url) {
    throw new Error('URL required');
  }

  opts.nokey = opts.key === undefined;
  opts.url = prependHttp(opts.url);

  pagespeed(opts, function (err, response) {
    if (err) {
      cb(err);
      return;
    }

    cb(err, response);
  });
};

module.exports.output = output;
