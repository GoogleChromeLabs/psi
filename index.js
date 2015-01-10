'use strict';
var googleapis = require('googleapis');
var prependHttp = require('prepend-http');
var pagespeed = googleapis.pagespeedonline('v1').pagespeedapi.runpagespeed;

module.exports = function (opts, cb) {
  opts = opts || {};
  cb = cb || function () {};

  if (!opts.url) {
    throw new Error('URL required');
  }

  opts.strategy = opts.strategy || 'desktop';
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
