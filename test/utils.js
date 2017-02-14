'use strict';
/* eslint-env mocha */
const assert = require('assert');
const chalk = require('chalk');
const utils = require('../lib/utils');

describe('Report utils', () => {
  it('should create a divider', () => {
    const expected = '\n--------------------------------------------------------\n';
    assert.equal(chalk.stripColor(utils.divider), expected);
  });

  it('should create buffer space', () => {
    const expected = '';
    const msg = 'a';
    const length = 2;
    assert.equal(utils.buffer(msg, length), expected);
  });

  it('should create label', () => {
    const expected = 'Enable GZIP compression                    | ';
    const msg = 'EnableGzipCompression';
    assert.equal(chalk.stripColor(utils.labelize(msg)), expected);
  });

  it('should select red for scores 20 or less', () => {
    const expected = chalk.red.toString();
    const score = 20;
    assert.equal(utils.scoreColor(score).toString(), expected);
  });

  it('should select yellow for scores between 21 and 79', () => {
    const expected = chalk.yellow.toString();
    const score = 50;
    assert.equal(utils.scoreColor(score).toString(), expected);
  });

  it('should select green for scores greater than 80', () => {
    const expected = chalk.green.toString();
    const score = 80;
    assert.equal(utils.scoreColor(score).toString(), expected);
  });
});
