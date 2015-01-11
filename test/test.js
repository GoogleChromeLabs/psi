/*global describe, beforeEach, afterEach, it */
'use strict';
var assert = require('assert');
var chalk = require('chalk');
var response = require('./fixtures/response');
var output = require('../lib/output');

describe('PSI formatting', function () {
  beforeEach(function () {
    this.log = console.log;
    this.formattedOutput = '';

    console.log = function (content) {
      this.formattedOutput += content + '\n';
      this.log(content);
    }.bind(this);
  });

  afterEach(function () {
    console.log = this.log;
  });

  it('should correctly format PageSpeed Insights response', function () {
    output({strategy: 'desktop'}, response);
    assert(/Score:     88/.test(chalk.stripColor(this.formattedOutput)));
  });

  it('should format PageSpeed Insights response as TAP output', function () {
    output({strategy: 'desktop', format: 'tap'}, response);
    assert(/ok 1 - psi/.test(chalk.stripColor(this.formattedOutput)));
  });

  it('should format PageSpeed Insights response as JSON output', function () {
    output({strategy: 'desktop', format: 'json'}, response);
    assert(/"Score": 88/.test(chalk.stripColor(this.formattedOutput)));
  });
});
