#!/usr/bin/env node
'use strict';
var pkg = require('../package.json');
var argv = require('minimist')((process.argv.slice(2)));
var insights = require('../');
var query = process.argv[2];
var opts = {};

function printHelp() {
  console.log(pkg.description);
  console.log('');
  console.log('Usage:');
  console.log('  $ psi <url> --key=<key>');
  console.log('');
  console.log('Optional, supply other arguments.');
  console.log('See https://developers.google.com/speed/docs/insights/v1/getting_started for description');
  console.log('  $ psi <url> --key=<key> --prettyprint=<true> --userIp=<userIp> --locale=<locale> --strategy=<desktop|mobile> --format=<cli|json|tap>');
}

if (!query || process.argv.indexOf('-h') !== -1 || process.argv.indexOf('--help') !== -1) {
  printHelp();
  return;
}

if (process.argv.indexOf('-v') !== -1 || process.argv.indexOf('--version') !== -1) {
  console.log(pkg.version);
  return;
}

opts.url = argv._[0];

if (!opts.url) {
  printHelp();
  return;
}

if (argv.url) {
  opts.url = argv.url;
}

if (argv.key) {
  opts.key = argv.key;
}

if (argv.callback) {
  opts.callback = argv.callback;
}

if (argv.prettyprint) {
  opts.prettyprint = argv.prettyprint;
}

if (argv.userIp) {
  opts.userIp = argv.userIp;
}

if (argv.locale) {
  opts.locale = argv.locale;
}

if (argv.strategy) {
  opts.strategy = argv.strategy;
}

if (argv.format) {
  opts.format = argv.format;
}

insights(opts);
