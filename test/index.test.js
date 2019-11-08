/* eslint-env mocha */
const {expect} = require('chai');
const rewire = require('rewire');

const psiWired = rewire('..');
const handleOptions = psiWired.__get__('handleOpts');

const psi = require('..');

describe('Index file', () => {
  it('should throw an error if no url is passed to cli', async () => {
    await psi('')
      .then(result => result)
      .catch(error => {
        expect(error.message).to.eql('URL required');
      });
  });
  describe('handleOpts method', async () => {
    const defaultConfig = {
      nokey: true,
      url: 'http://addyosmani.com'
    };

    it('should return strategy "mobile" if no strategy is passed', () => {
      const expectedOutput = {
        ...defaultConfig,
        strategy: 'mobile'
      };
      expect(handleOptions('http://addyosmani.com')).to.eql(expectedOutput);
    });
    it('should return strategy "desktop" if "desktop" is passed as strategy', () => {
      const expectedOutput = {
        ...defaultConfig,
        strategy: 'desktop'
      };
      expect(handleOptions('http://addyosmani.com', {strategy: 'desktop'})).to.eql(expectedOutput);
    });
  });
});
