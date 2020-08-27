/* eslint-env mocha */
const {expect} = require('chai');
const {getLink} = require('../lib/string-utils');

describe('stringUtils module', () => {
  describe('getLink method', () => {
    it('should return the url from a string', () => {
      const str = `Consider lazy - loading offscreen and hidden images after all critical resources
       have finished loading to lower time to interactive. [Learn more](https://web.dev/offscreen-images).`;
      expect(getLink(str)).to.eql('https://web.dev/offscreen-images');
    });
    it('should return an empty string when it does not contain an url', () => {
      const str = `Consider lazy - loading offscreen and hidden images after all critical resources
       have finished loading to lower time to interactive.`;
      expect(getLink(str)).to.eql('');
    });
  });
});
