const { createSandbox } = require('sinon');
const { expect } = require('chai');

const { get, post } = require('../../../../lib/handlers/index');

describe('lib/handlers/index.js', () => {
  let res;
  let sandbox;

  before(() => {
    sandbox = createSandbox();
  });

  beforeEach(() => {
    res = {
      redirect: sandbox.fake(),
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
      expect(res.render.getCall(0).args).to.deep.equal(['index']);
    });
  });

  describe('post()', () => {
    it('should call res.redirect()', () => {
      post(null, res);

      expect(res.redirect.callCount).to.equal(1);
      expect(res.redirect.getCall(0).args).to.deep.equal(['/addresses']);
    });
  });
});
