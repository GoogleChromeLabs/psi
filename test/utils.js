/* globals describe, it */
'use strict';

var assert = require('assert');
var utils = require('../lib/utils');

describe('Report utils', function() {

  it('should create a divider', function() {
    var expected = '\n----------------------------------------------------------------\n';
    assert.equal(utils.divider, expected);
  });

  it('should create buffer space', function() {
    var expected = '';
    var msg = 'a';
    var length = 2;
    assert.equal(utils.buffer(msg, length), expected);
  });

  it('should create buffer space, defaulting to 50 spaces', function() {
    var expected = new Array(31).join(' ');
    var msg = new Array(20).join('a');
    assert.equal(utils.buffer(msg), expected);
  });

  it('should create human label from data label', function() {
    var expected = 'Enable Gzip Compression';
    var msg = 'enableGzipCompression';
    assert.equal(utils.firstToUpperCaseAndAddSpace(msg), expected);
  });
});
