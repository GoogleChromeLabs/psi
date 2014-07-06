/*
 * utils
 *
 * Collection of functions for report output
 */
'use strict';

var divider = function () {
  return '\n' + new Array(65).join('-') + '\n';
};

var bufferSpace = function (msg, length) {
  var buffer = '';

  if (length === null) {
      length = 50;
  }
  if (length - msg.length > 0) {
    buffer = new Array(length - msg.length).join(' ');
  }
  return buffer;
};

var addSpacesToWords = function (msg) {
  return msg.replace(/([A-Z]+)/g, ' $1').replace(/([A-Z][a-z])/g, '$1');
};

var firstToUpperCaseAndAddSpace = function (msg) {
  msg = msg.replace('Bytes', '');
  return msg.charAt(0).toUpperCase() + addSpacesToWords(msg.slice(1));
};

exports.divider = divider;
exports.bufferSpace = bufferSpace;
exports.firstToUpperCaseAndAddSpace = firstToUpperCaseAndAddSpace;
