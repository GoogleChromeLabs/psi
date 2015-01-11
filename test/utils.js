/*globals describe, it */
'use strict';
var assert = require('assert');
var chalk = require('chalk');
var utils = require('../lib/utils');

describe('Report utils', function () {
  it('should create a divider', function () {
    var expected = '\n--------------------------------------------------------\n';
    assert.equal(chalk.stripColor(utils.divider), expected);
  });

  it('should create buffer space', function () {
    var expected = '';
    var msg = 'a';
    var length = 2;
    assert.equal(utils.buffer(msg, length), expected);
  });

  it('should create label', function () {
    var expected = 'Enable GZIP compression                    | ';
    var msg = 'EnableGzipCompression';
    assert.equal(chalk.stripColor(utils.labelize(msg)), expected);
  });

  it('should select red for scores 20 or less', function () {
    var expected = chalk.red.toString();
    var score = 20;
    assert.equal(utils.scoreColor(score).toString(), expected);
  });

  it('should select yellow for scores between 21 and 79', function () {
    var expected = chalk.yellow.toString();
    var score = 50;
    assert.equal(utils.scoreColor(score).toString(), expected);
  });

  it('should select green for scores greater than 80', function () {
    var expected = chalk.green.toString();
    var score = 80;
    assert.equal(utils.scoreColor(score).toString(), expected);
  });
});
