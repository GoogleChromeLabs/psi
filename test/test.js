/* global describe, beforeEach, afterEach, it */
'use strict';

var assert    = require('assert');
var chalk     = require('chalk');
var insights  = require('../index');
var Output    = require('../lib/output');
var fs        = require('fs');
var Path      = require('path');

describe('PSI formatting', function () {
  beforeEach(function () {
    var World            = this;
    this.Log             = console.log;
    this.output          = Output.init();
    this.response        = require('./fixtures/response');
    this.Output          = fs.readFileSync(Path.join(__dirname, 'fixtures/output.txt'), 'utf8');
    this.TapOutput       = fs.readFileSync(Path.join(__dirname, 'fixtures/output-tap.txt'), 'utf8');
    this.JsonOutput      = fs.readFileSync(Path.join(__dirname, 'fixtures/output-json.txt'), 'utf8');
    this.formattedOutput = '';

    console.log = function(content) {
      World.formattedOutput += content + '\n';
      this.Log(content);
    }.bind(this);
  });

  afterEach(function () {
    console.log = this.Log;
  });

  it('should correctly format PageSpeed Insights response', function () {
    this.output.process({strategy: 'desktop'}, this.response);
    assert.equal(chalk.stripColor(this.formattedOutput), this.Output);
  });

  it('should prevent invalid formats from being used', function () {
    this.output.process({strategy: 'desktop', format: 'xml'}, this.response);
    assert.equal(chalk.stripColor(this.formattedOutput), this.Output);
  });

  it('should format PageSpeed Insights response as TAP output', function () {
    this.output.process({strategy: 'desktop', format: 'tap'}, this.response);
    assert.equal(this.formattedOutput, this.TapOutput);
  });

  it('should format PageSpeed Insights response as JSON output', function () {
    this.output.process({strategy: 'desktop', format: 'json'}, this.response);
    assert.equal(this.formattedOutput, this.JsonOutput);
  });
});

describe('CLI Error handling', function() {
  it('should throw if no valid URL is provided', function () {
    assert.throws(function () {
      insights({}, function() {});
    });
  });
});
