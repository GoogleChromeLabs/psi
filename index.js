/*
 * psi
 * http://github.com/addyosmani/psi
 *
 * Copyright (c) 2014 Google Inc.
 * Licensed under an Apache 2 license.
 */

'use strict';
var pagespeed = require('gpagespeed');
var output = require('./output').init();

module.exports = function (opts, cb) {
	opts = opts || {};
	opts.nokey = opts.key === void 0;

	cb = cb || function () {};
	console.log('Running Pagespeed Insights');
	pagespeed(opts, function(err, data){
	  if (err) {
	  	cb(err); return;
	  } else {
		  var response = JSON.parse(data);
		  output.process(opts, response);
		  cb(err, response);
		}
	});
};