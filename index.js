/*
 * psi
 * http://github.com/addyosmani/psi
 *
 * Copyright (c) 2014 Google Inc.
 * Licensed under an Apache 2 license.
 */

'use strict';
var pagespeed = require('gpagespeed');
var prependHttp = require('prepend-http');
var output = require('./output').init();

module.exports = function (opts, cb) {
  opts = opts || {};
  cb = cb || function () {};

  if (!opts.url) {
    throw new Error('URL required');
  }

  opts.strategy = opts.strategy || 'desktop';
  opts.nokey = opts.key === undefined;
  opts.url = prependHttp(opts.url);

  pagespeed(opts, function (err, data) {
    if (err) {
      cb(err);
      return;
    }

    var response = data;
    output.process(opts, response, function(processErr) {
      cb(processErr || err, response);
    });
  });
};
