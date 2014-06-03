/*
 * psi
 * http://github.com/addyosmani/psi
 *
 * Copyright (c) 2014 Addy Osmani
 * Licensed under an MIT license.
 */

'use strict';
var pagespeed = require('gpagespeed');
var output = require('./output').init();

module.exports = function (opts, cb) {
	opts = opts || {};
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