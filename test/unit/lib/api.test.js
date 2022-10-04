const { createSandbox } = require('sinon');
const { expect } = require('chai');

const proxyquire = require('proxyquire').noCallThru();

const { addresses } = require('../../stub-data');

describe('lib/api.js', () => {
  let api;
  let axios;
  let result;
  let sandbox;

  before(() => {
    sandbox = createSandbox();
  });

  beforeEach(() => {
    axios = {
      get: sandbox.stub(),
    };

    api = proxyquire('../../../lib/api.js', {
      axios,
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('api()', () => {
    context('data.results', () => {
      beforeEach(async () => {
        axios.get.returns({
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

      it('should return an addresses array', () => {
        expect(result).to.deep.equal(addresses);
      });
    });

    context('!data.results', () => {
      beforeEach(async () => {
        axios.get.returns({
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
