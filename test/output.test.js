/* eslint-env mocha */
const {expect} = require('chai');
const rewire = require('rewire');

const outputWired = rewire('./../lib/output.js');
const getThreshold = outputWired.__get__('getThreshold');

describe('getThreshold method', () => {
  it('should return "70" if no valid value is passed', () => {
    expect(getThreshold('string')).to.equal(70);
    expect(getThreshold(false)).to.equal(70);
    expect(getThreshold(101)).to.equal(70);
  });
  it('should return the passed threshold value if correct', () => {
    expect(getThreshold(80)).to.equal(80);
  });
});
