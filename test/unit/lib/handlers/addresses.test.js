const { createSandbox } = require('sinon');
const { expect } = require('chai');

const { get } = require('../../../../lib/handlers/addresses');

const { addresses } = require('../../../stub-data');

describe('lib/handlers/addresses.js', () => {
  let req;
  let res;
  let sandbox;

  before(() => {
    sandbox = createSandbox();
  });

  beforeEach(() => {
    req = {
      session: {
        addresses,
      },
    };

    res = {
      render: sandbox.fake(),
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('get()', () => {
    it('should call res.render()', () => {
      get(req, res);

      expect(res.render.callCount).to.equal(1);

      expect(res.render.getCall(0).args).to.deep.equal(['addresses', {
        addresses: [
          {
            address: '1, FEATHERWOOD AVENUE, NEWCASTLE UPON TYNE, NE15 6BW',
            uprn: 4510736476,
          },
          {
            address: '3, FEATHERWOOD AVENUE, NEWCASTLE UPON TYNE, NE15 6BW',
            uprn: 4510738107,
          },
        ],
      }]);
    });
  });
});
