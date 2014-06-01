/*
 * pagespeed-insights
 * http://github.com/addyosmani/pagespeed-insights
 *
 * Copyright (c) 2014 Addy Osmani
 * Licensed under the Apache 2.0 license.
 */

'use strict';
var pagespeed = require('gpagespeed');
var output = require('./output').init();

module.exports = function (options) {
	console.log('Running Pagespeed Insights');
	  var opts = {
	    url: options.url,
	    key: options.key
	  };

	pagespeed(opts, function(err, data){
	  if(err) throw err;
	  var response = JSON.parse(data);
	  output.process(options, response);
	});
};