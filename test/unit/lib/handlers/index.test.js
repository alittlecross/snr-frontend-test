const { createSandbox } = require('sinon');
const { expect } = require('chai');

const proxyquire = require('proxyquire').noCallThru();

const { addresses } = require('../../../stub-data');

describe('lib/handlers/index.js', () => {
  let api;
  let get;
  let post;
  let req;
  let res;
  let sandbox;

  before(() => {
    sandbox = createSandbox();
  });

  beforeEach(() => {
    api = sandbox.fake.returns(addresses);

    req = {
      body: {},
      session: {},
    };

    res = {
      redirect: sandbox.fake(),
      render: sandbox.fake(),
    };

    ({ get, post } = proxyquire('../../../../lib/handlers/index', {
      '../api': api,
    }));
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
    beforeEach(async () => {
      req.body.postcode = 'NE15 6BW';

      await post(req, res);
    });

    it('should call api()', () => {
      expect(api.callCount).to.equal(1);
      expect(api.getCall(0).args).to.deep.equal(['NE15 6BW']);
    });

    it('should call res.redirect()', () => {
      expect(res.redirect.callCount).to.equal(1);
      expect(res.redirect.getCall(0).args).to.deep.equal(['/addresses']);
    });
  });
});
