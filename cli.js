#!/usr/bin/env node
'use strict';
var meow = require('meow');
var updateNotifier = require('update-notifier');
var psi = require('./');

var cli = meow({
    help: [
        'Usage',
        '  a11y <url>',
        '',
        'Example',
        '  a11y todomvc.com',
        '',
        'Options',
        '  --key          Google API Key. By default the free tier is used.',
        '  --format       Output format: cli|json|tap',
        '  --strategy     Strategy to use when analyzing the page: desktop|mobile',
        '  --prettyprint  Pretty print the result.',
        '  --locale       Locale results should be generated in.'
    ].join('\n')
});

updateNotifier({
    packageName: cli.pkg.name,
    packageVersion: cli.pkg.version
}).notify();

if (!cli.input[0]) {
    console.error('Please supply an URL');
    process.exit(1);
}

cli.flags.url = cli.input[0];

psi(cli.flags, function (err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  process.exit(0);
});
