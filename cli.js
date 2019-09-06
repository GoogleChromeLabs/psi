#!/usr/bin/env node
'use strict';
const meow = require('meow');
const chalk = require('chalk');
const updateNotifier = require('update-notifier');
const psi = require('.');

const cli = meow(`
  Usage
    $ psi <url>

  Options
    --key        Google API Key. By default the free tier is used
    --strategy   Strategy to use when analyzing the page: mobile|desktop
    --format     Output format: cli|json|tap
    --locale     Locale results should be generated in
    --threshold  Threshold score to pass the PageSpeed test

  Example
    $ psi https://addyosmani.com --strategy=mobile
`);

updateNotifier({pkg: cli.pkg}).notify();

if (!cli.input[0]) {
  console.error('Specify a URL');
  process.exit(1);
}

psi.output(cli.input[0], cli.flags).then(() => {
  process.exit();
}).catch(error => {
  if (error.noStack) {
    console.error(chalk.red(error.message));
    process.exit(1);
  } else {
    throw error;
  }
});
