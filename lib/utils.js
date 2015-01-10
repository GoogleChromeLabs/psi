'use strict';
var chalk = require('chalk');
var repeating = require('repeating');

exports.divider = '\n' + chalk.grey(repeating('-', 56)) + '\n';

exports.buffer = function (msg, length) {
  var ret = '';

  if (length === undefined) {
      length = 44;
  }

  length = length - msg.length - 1;

  if (length > 0) {
    ret = repeating(' ', length);
  }

  return ret;
};

exports.addSpacesToWords = function (msg) {
  return msg.replace(/([A-Z]+)/g, ' $1').replace(/([A-Z][a-z])/g, '$1');
};

exports.firstToUpperCaseAndAddSpace = function (msg) {
  msg = msg.replace('Bytes', '');
  return msg.charAt(0).toUpperCase() + exports.addSpacesToWords(msg.slice(1));
};

exports.scoreColor = function(score) {
  var color = chalk.yellow;
  color = score < 21 ? chalk.red : color;
  color = score > 79 ? chalk.green : color;
  return color;
};

exports.labelize = function(msg) {
  var label = exports.firstToUpperCaseAndAddSpace(msg);
  return label + exports.buffer(label) + chalk.grey('| ');
};
