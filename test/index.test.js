/* eslint-env mocha */
const {expect} = require('chai');

const psi = require('..');

describe('Index file', () => {
  it('should throw an error if no url is passed to cli', async () => {
    await psi('')
      .then(result => result)
      .catch(error => {
        expect(error.message).to.eql('URL required');
      });
  });
});
