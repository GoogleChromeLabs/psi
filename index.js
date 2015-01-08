/*
 * psi
 * http://github.com/addyosmani/psi
 *
 * Copyright (c) 2014 Google Inc.
 * Licensed under an Apache 2 license.
 */
'use strict';
var googleapis = require('googleapis');
var prependHttp = require('prepend-http');
var output = require('./lib/output').init();
var pagespeed = googleapis.pagespeedonline('v1').pagespeedapi.runpagespeed;

module.exports = function (opts, cb) {
  opts = opts || {};
  cb = cb || function () {};

  if (!opts.url) {
    throw new Error('URL required');
  }

  opts.strategy = opts.strategy || 'desktop';
  opts.format = opts.format || 'cli';
  opts.nokey = opts.key === undefined;
  opts.url = prependHttp(opts.url);

  pagespeed(opts, function (err, response) {
    if (err) {
      cb(err);
      return;
    }

    output.process(opts, response, function (processErr) {
      cb(processErr || err, response);
    });
  });
};
