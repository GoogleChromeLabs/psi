'use strict';
var chalk = require('chalk');
var repeating = require('repeating');

var humanizeTitleMap = {
  numberResources: 'Resources',
  numberHosts: 'Hosts',
  totalRequestBytes: 'Total size',
  numberStaticResources: 'Static resources',
  htmlResponseBytes: 'HTML size',
  cssResponseBytes: 'CSS size',
  imageResponseBytes: 'Image size',
  javascriptResponseBytes: 'JavaScript size',
  otherResponseBytes: 'Other size',
  numberJsResources: 'JS resources',
  numberCssResources: 'CSS resources',
  AvoidLandingPageRedirects: 'Avoid landing page redirects',
  AvoidPlugins: 'Avoid plugins',
  ConfigureViewport: 'Configure viewport',
  EnableGzipCompression: 'Enable GZIP compression',
  LeverageBrowserCaching: 'Leverage browser caching',
  MainResourceServerResponseTime: 'Main resource server response time',
  MinifyCss: 'Minify CSS',
  MinifyHTML: 'Minify HTML',
  MinifyJavaScript: 'Minify JavaScript',
  MinimizeRenderBlockingResources: 'Minimize render blocking resources',
  OptimizeImages: 'Optimize images',
  PrioritizeVisibleContent: 'Prioritize visible content',
  SizeContentToViewport: 'Size content to viewport',
  SizeTapTargetsAppropriately: 'Size tap targets appropriately',
  UseLegibleFontSizes: 'Use legible font sizes'
};

exports.divider = '\n' + chalk.grey(repeating('-', 56)) + '\n';

exports.buffer = function (msg, length) {
  var ret = '';

  if (length === undefined) {
      length = 44;
  }

  length = length - msg.length - 1;

  if (length > 0) {
    ret = repeating(' ', length);
  }

  return ret;
};

exports.scoreColor = function(score) {
  var color = chalk.yellow;
  color = score < 21 ? chalk.red : color;
  color = score > 79 ? chalk.green : color;
  return color;
};

exports.labelize = function(str) {
  var label = humanizeTitleMap[str] || str;
  return label + exports.buffer(label) + chalk.grey('| ');
};
