const { expect } = require('chai');

const validate = require('../../../../lib/validators/index');

describe('test/unit/validators/index.test.js', () => {
  describe('validate()', () => {
    it('should return a message if there is no postcode property', () => {
      const result = validate({});

      expect(result).to.equal('Enter a postcode');
    });

    it('should return a message if the postcode property does not pass the regular expression test', () => {
      const result = validate({
        postcode: 'X',
      });

      expect(result).to.equal('Enter a postcode in the correct format, like NE15 6BW');
    });

    it('should return null if the postcode property is valid', () => {
      const result = validate({
        postcode: 'NE15 6BW',
      });

      expect(result).to.be.null;
    });
  });
});
