#!/usr/bin/env node
'use strict';
// Adapted from cli.js in gpagespeed

var insights = require('./index')
  , pkg = require('./package.json')
  , query = process.argv[2]
  , argv = require('minimist')((process.argv.slice(2)))
  , opts = {}
  ;

function printHelp() {
  console.log(pkg.description);
  console.log('');
  console.log('Usage:');
  console.log('  $ psi <url> --key=<key>');
  console.log('');
  console.log('Optional, supply other arguments.');
  console.log('See https://developers.google.com/speed/docs/insights/v1/getting_started for description');
  console.log('  $ psi <url> --key=<key> --prettyprint=<true> --userIp=<userIp> --locale=<locale> --strategy=<desktop|mobile>');
}

if (!query || process.argv.indexOf('-h') !== -1 || process.argv.indexOf('--help') !== -1) {
  printHelp();
  return;
}

if (process.argv.indexOf('-v') !== -1 || process.argv.indexOf('--version') !== -1) {
  console.log(pkg.version);
  return;
}

if (query.indexOf('http') !== -1) {
  opts.url = argv._[0];
}

if(!opts.url){
  printHelp();
  return;
}

if(argv.url){
  opts.url = argv.url;
}

if(argv.key){
  opts.key = argv.key;
}

if(argv.callback){
  opts.callback = argv.callback;
}

if(argv.prettyprint){
  opts.prettyprint = argv.prettyprint;
}

if(argv.userIp){
  opts.userIp = argv.userIp;
}

if(argv.locale){
  opts.locale = argv.locale;
}

if(argv.strategy){
  opts.strategy = argv.strategy;
}

insights(opts);