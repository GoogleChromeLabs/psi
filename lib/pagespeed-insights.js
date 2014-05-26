/*
 * pagespeed-insights
 * http://github.com/addyosmani/pagespeed-insights
 *
 * Copyright (c) 2014 Addy Osmani, James Cryer
 * Licensed under the Apache 2.0 license.
 */

'use strict';
var config = require('./config').init();
var pagespeed = require('./pagespeed').init();
var output = require('./output').init();

module.exports = function (options) {
    console.log('Running Pagespeed Insights');
    return pagespeed.run(config.params(options), output.process, options.done);
};