#!/usr/bin/env node
'use strict';
var meow = require('meow');
var updateNotifier = require('update-notifier');
var prependHttp = require('prepend-http');
var output = require('./lib/output').init();
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

var opts = cli.flags;
opts.url = prependHttp(cli.input[0]);
opts.format = opts.format || 'cli';
opts.strategy = opts.strategy || 'desktop';

psi(opts, function (err, res) {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  output.process(opts, res);
  process.exit(0);
});
