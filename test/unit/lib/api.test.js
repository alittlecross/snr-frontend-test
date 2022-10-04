const { createSandbox } = require('sinon');
const { expect } = require('chai');

const proxyquire = require('proxyquire').noCallThru();

const { addresses } = require('../../stub-data');

describe('lib/api.js', () => {
  let api;
  let axios;
  let httpError;
  let result;
  let sandbox;

  before(() => {
    sandbox = createSandbox();
  });

  beforeEach(() => {
    axios = {
      get: sandbox.stub(),
    };

    httpError = sandbox.fake.returns('an httpError');

    api = proxyquire('../../../lib/api.js', {
      axios,
      'http-errors': httpError,
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('api()', () => {
    context('status !== 200', () => {
      beforeEach(async () => {
        axios.get.returns({
          status: 418,
        });

        try {
          await api('NE15 6BW');
        } catch (err) {
          result = err;
        }
      });

      it('should call axios.get()', () => {
        expect(axios.get.callCount).to.equal(1);
        expect(axios.get.getCall(0).args).to.deep.equal(['https://api.os.uk/search/places/v1/postcode?postcode=NE156BW&key=gLfSz6lFO7CVKDABcxg96TSAf4DK5YNQ']);
      });

      it('should call httpError()', () => {
        expect(httpError.callCount).to.equal(1);
        expect(httpError.getCall(0).args).to.deep.equal([500, 'https://api.os.uk/search/places/v1/postcode returned 418']);
      });

      it('should throw an error', () => {
        expect(result).to.equal('an httpError');
      });
    });

    context('data.results', () => {
      beforeEach(async () => {
        axios.get.returns({
          status: 200,
          data: {
            results: addresses,
          },
        });

        result = await api('NE15 6BW');
      });

      it('should call axios.get()', () => {
        expect(axios.get.callCount).to.equal(1);
        expect(axios.get.getCall(0).args).to.deep.equal(['https://api.os.uk/search/places/v1/postcode?postcode=NE156BW&key=gLfSz6lFO7CVKDABcxg96TSAf4DK5YNQ']);
      });

      it('should return an array', () => {
        expect(result).to.deep.equal(addresses);
      });
    });

    context('!data.results', () => {
      beforeEach(async () => {
        axios.get.returns({
          status: 200,
          data: {},
        });

        result = await api('NE15 6BW');
      });

      it('should call axios.get()', () => {
        expect(axios.get.callCount).to.equal(1);
        expect(axios.get.getCall(0).args).to.deep.equal(['https://api.os.uk/search/places/v1/postcode?postcode=NE156BW&key=gLfSz6lFO7CVKDABcxg96TSAf4DK5YNQ']);
      });

      it('should return an empty array', () => {
        expect(result).to.deep.equal([]);
      });
    });
  });
});
