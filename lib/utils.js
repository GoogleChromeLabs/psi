/*
 * utils
 *
 * Collection of functions for report output
 */
'use strict';

var chalk = require('chalk');

var divider = '\n' + chalk.grey(new Array(65).join('-')) + '\n';

var buffer = function (msg, length) {
  var buffer = '';

  if (length === undefined) {
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

var scoreColor = function(score) {
  var color = chalk.yellow;
  color = score < 21 ? chalk.red : color;
  color = score > 79 ? chalk.green : color;
  return color;
};

var labelize = function(msg) {
  var label = firstToUpperCaseAndAddSpace(msg);
  return label + buffer(label) + chalk.grey('| ');
};

module.exports = {
  scoreColor: scoreColor,
  buffer: buffer,
  divider: divider,
  labelize: labelize,
  firstToUpperCaseAndAddSpace: firstToUpperCaseAndAddSpace
};
