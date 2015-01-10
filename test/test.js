/*global describe, beforeEach, afterEach, it */
'use strict';
var assert = require('assert');
var chalk = require('chalk');
var output = require('../lib/output');

describe('PSI formatting', function () {
  beforeEach(function () {
    this.log = console.log;
    this.response = require('./fixtures/response');
    this.output = output.init();
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
    this.output.process({strategy: 'desktop'}, this.response);
    assert(/Score:     88/.test(chalk.stripColor(this.formattedOutput)));
  });

  it('should format PageSpeed Insights response as TAP output', function () {
    this.output.process({strategy: 'desktop', format: 'tap'}, this.response);
    assert(/ok 1 - psi/.test(chalk.stripColor(this.formattedOutput)));
  });

  it('should format PageSpeed Insights response as JSON output', function () {
    this.output.process({strategy: 'desktop', format: 'json'}, this.response);
    assert(/"Score": 88/.test(chalk.stripColor(this.formattedOutput)));
  });
});
