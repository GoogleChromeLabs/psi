/* eslint-env mocha */
/* eslint-disable node/no-deprecated-api */
'use strict';
const { assert } = require('chai');
const chalk = require('chalk');
const stripAnsi = require('strip-ansi');
const utils = require('../lib/utils');

describe('Report utils', () => {
  it('should create a divider', () => {
    const expected = '\n--------------------------------------------------------\n';
    assert.equal(stripAnsi(utils.divider), expected);
  });

  it('should create buffer space', () => {
    const expected = '';
    const msg = 'a';
    const length = 2;
    assert.equal(utils.buffer(msg, length), expected);
  });

  it('should create label', () => {
    const expected = 'First Input Delay (FID)                    | ';
    const msg = 'FIRST_INPUT_DELAY_MS';
    assert.equal(stripAnsi(utils.labelize(msg)), expected);
  });

  it('should select red for scores 49 or less', () => {
    const expected = chalk.red.toString();
    const score = 49;
    assert.equal(utils.scoreColor(score).toString(), expected);
  });

  it('should select yellow for scores between 50 and 89', () => {
    const expected = chalk.yellow.toString();
    const score = 50;
    assert.equal(utils.scoreColor(score).toString(), expected);
  });

  it('should select green for scores greater than 89', () => {
    const expected = chalk.green.toString();
    const score = 90;
    assert.equal(utils.scoreColor(score).toString(), expected);
  });
});
