/* eslint-env mocha */
'use strict';
const assert = require('assert');
const stripAnsi = require('strip-ansi');
const output = require('../lib/output');
const psi = require('..');
const response = require('./fixtures/response');

describe('Formatting', () => {
  beforeEach(function () {
    this.log = console.log;
    this.formattedOutput = '';

    console.log = content => {
      this.formattedOutput += content + '\n';
      this.log(content);
    };
  });

  afterEach(function () {
    console.log = this.log;
  });

  it('should correctly format PageSpeed Insights response', function () {
    return output({strategy: 'desktop'}, response).then(() => {
      assert(/Speed: +88/.test(stripAnsi(this.formattedOutput)));
    });
  });

  it('should format PageSpeed Insights response as TAP output', function () {
    return output({strategy: 'desktop', format: 'tap'}, response).then(() => {
      assert(/ok 1 - psi/.test(stripAnsi(this.formattedOutput)));
    });
  });

  it('should format PageSpeed Insights response as JSON output', function () {
    return output({strategy: 'desktop', format: 'json'}, response).then(() => {
      assert(/"Speed": 88/.test(stripAnsi(this.formattedOutput)));
    });
  });

  it('should have an error in the callback if threshold is not met', () => {
    return output({threshold: 100}, response).catch(err => {
      assert.equal(err.name, 'Error', 'Expected an error.');
    });
  });
});

describe('API', function () {
  this.timeout(50000);

  it('should get data from PageSpeed Insights', () => {
    return psi('google.com').then(data => {
      assert.strictEqual(data.title, 'http://google.com/');
    });
  });

  it('should support options', () => {
    return psi('google.com', {locale: 'no'}).then(data => {
      assert.strictEqual(data.formattedResults.locale, 'no');
    });
  });
});
