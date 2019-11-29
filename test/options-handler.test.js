/* eslint-env mocha */
const {expect} = require('chai');

const {getOptions, getThreshold, getReporter} = require('../lib/options-handler');

describe('Options handler method', () => {
  describe('getOptions method', () => {
    const defaultConfig = {
      nokey: true,
      url: 'http://addyosmani.com'
    };
    it('should return strategy "mobile" if no strategy is passed', () => {
      const expectedOutput = {
        ...defaultConfig,
        strategy: 'mobile'
      };
      expect(getOptions('http://addyosmani.com')).to.eql(expectedOutput);
    });
    it('should respect passed strategy options', () => {
      const expectedOutput = {
        ...defaultConfig,
        strategy: 'desktop'
      };
      expect(getOptions('http://addyosmani.com', {strategy: 'desktop'})).to.eql(expectedOutput);
    });
  });

  describe('getThreshold method', () => {
    it('should return "70" if no valid value is passed', () => {
      expect(getThreshold('string')).to.equal(70);
      expect(getThreshold(false)).to.equal(70);
      expect(getThreshold(101)).to.equal(70);
    });
    it('should respect passed threshold values', () => {
      expect(getThreshold(80)).to.equal(80);
    });
  });

  describe('getReporter method', () => {
    it('should return "cli" if no valid format is passed', () => {
      expect(getReporter('foo')).to.equal('cli');
    });
    it('should respect passed format if valid', () => {
      expect(getReporter('cli')).to.equal('cli');
      expect(getReporter('tap')).to.equal('tap');
      expect(getReporter('json')).to.equal('json');
    });
  });
});
