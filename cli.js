#!/usr/bin/env node
'use strict';
var meow = require('meow');
var updateNotifier = require('update-notifier');
var psi = require('./');

var cli = meow({
  help: [
    'Usage',
    '  psi <url> <options>',
    '',
    'Example',
    '  psi todomvc.com --strategy=mobile',
    '',
    'Options',
    '  --key          Google API Key. By default the free tier is used.',
    '  --strategy     Strategy to use when analyzing the page: mobile|desktop',
    '  --format       Output format: cli|json|tap',
    '  --locale       Locale results should be generated in.',
    '  --threshold    Threshold score to pass the PageSpeed test.'
  ].join('\n')
});

updateNotifier({pkg: cli.pkg}).notify();

if (!cli.input[0]) {
  console.error('Please supply an URL');
  process.exit(1);
}

psi.output(cli.input[0], cli.flags, function (err, res) {
  if (err) {
    if (err.noStack) {
      console.error(err.message);
      process.exit(1);
    } else {
      throw err;
    }
  }

  process.exit(0);
});
