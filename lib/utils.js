'use strict';
const chalk = require('chalk');

const humanizeTitleMap = {
  FIRST_CONTENTFUL_PAINT_MS: 'First Contentful Paint (FCP)',
  FIRST_INPUT_DELAY_MS: 'First Input Delay (FID)',
  CUMULATIVE_LAYOUT_SHIFT_SCORE: 'Cumulative Layout Shift (CLS)',
  LARGEST_CONTENTFUL_PAINT_MS: 'Largest Contentful Paint (LCP)',
};

exports.divider = '\n' + chalk.grey('-'.repeat(56)) + '\n';

exports.buffer = (msg, length) => {
  let ret = '';

  if (length === undefined) {
    length = 44;
  }

  length = length - msg.length - 1;

  if (length > 0) {
    ret = ' '.repeat(length);
  }

  return ret;
};

exports.scoreColor = score => {
  let color = chalk.yellow;
  color = score < 50 ? chalk.red : color;
  color = score > 89 ? chalk.green : color;
  return color;
};

exports.labelize = str => {
  const label = humanizeTitleMap[str] || str;
  return label + exports.buffer(label) + chalk.grey('| ');
};
