const { createSandbox } = require('sinon');
const { expect } = require('chai');

const { get } = require('../../../../lib/handlers/addresses');

describe('lib/handlers/addresses.js', () => {
  let res;
  let sandbox;

  before(() => {
    sandbox = createSandbox();
  });

  beforeEach(() => {
    res = {
      render: sandbox.fake(),
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('get()', () => {
    it('should call res.render()', () => {
      get(null, res);

      expect(res.render.callCount).to.equal(1);
      expect(res.render.getCall(0).args).to.deep.equal(['addresses']);
    });
  });
});
