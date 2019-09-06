/* eslint-env mocha */
'use strict';
const {assert} = require('chai');
const stripAnsi = require('strip-ansi');
const output = require('../lib/output');
const response = require('./fixtures/response');

describe('Formatting', () => {
  beforeEach(function () {
    this.log = console.log;
    this.formattedOutput = '';

    console.log = content => {
      this.formattedOutput += `${content}\n`;
      this.log(content);
    };
  });

  afterEach(function () {
    console.log = this.log;
  });

  it('should correctly format PageSpeed Insights response', function () {
    return output({strategy: 'desktop'}, response).then(() => {
      assert(/Performance: +99/.test(stripAnsi(this.formattedOutput)));
    });
  });

  it('should format PageSpeed Insights response as TAP output', function () {
    return output({strategy: 'desktop', format: 'tap'}, response).then(() => {
      assert(/ok 1 - psi/.test(stripAnsi(this.formattedOutput)));
    });
  });

  it('should format PageSpeed Insights response as JSON output', function () {
    return output({strategy: 'desktop', format: 'json'}, response).then(() => {
      assert(/"Performance": 99/.test(stripAnsi(this.formattedOutput)));
    });
  });

  it('should have an error in the callback if threshold is not met', () => {
    return output({threshold: 100}, response).catch(error => {
      assert.equal(error.name, 'Error', 'Expected an error.');
    });
  });
});
