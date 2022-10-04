const { createSandbox } = require('sinon');
const { expect } = require('chai');

const proxyquire = require('proxyquire').noCallThru();

const { addresses } = require('../../../stub-data');

describe('lib/handlers/index.js', () => {
  let api;
  let err;
  let get;
  let next;
  let post;
  let req;
  let res;
  let sandbox;
  let validate;

  before(() => {
    sandbox = createSandbox();
  });

  beforeEach(() => {
    api = sandbox.stub();
    err = new Error('an api error');
    next = sandbox.fake();

    req = {
      body: {},
      session: {},
    };

    res = {
      redirect: sandbox.fake(),
      render: sandbox.fake(),
    };

    validate = sandbox.stub();

    ({ get, post } = proxyquire('../../../../lib/handlers/index', {
      '../api': api,
      '../validators/index': validate,
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
    context('!error', () => {
      beforeEach(() => {
        req.body.postcode = 'NE15 6BW';

        validate.returns(null);
      });

      context('try', () => {
        beforeEach(async () => {
          api.returns(addresses);

          await post(req, res, next);
        });

        it('should call validate()', () => {
          expect(validate.callCount).to.equal(1);

          expect(validate.getCall(0).args).to.deep.equal([{
            postcode: 'NE15 6BW',
          }]);
        });

        it('should call api()', () => {
          expect(api.callCount).to.equal(1);
          expect(api.getCall(0).args).to.deep.equal(['NE15 6BW']);
        });

        it('should add the api response to the session', () => {
          expect(req.session.addresses).to.deep.equal(addresses);
        });

        it('should call res.redirect()', () => {
          expect(res.redirect.callCount).to.equal(1);
          expect(res.redirect.getCall(0).args).to.deep.equal(['/addresses']);
        });
      });

      context('catch', () => {
        beforeEach(async () => {
          api.throws(err);

          await post(req, res, next);
        });

        it('should call validate()', () => {
          expect(validate.callCount).to.equal(1);

          expect(validate.getCall(0).args).to.deep.equal([{
            postcode: 'NE15 6BW',
          }]);
        });

        it('should call api()', () => {
          expect(api.callCount).to.equal(1);
          expect(api.getCall(0).args).to.deep.equal(['NE15 6BW']);
        });

        it('should call next()', () => {
          expect(next.callCount).to.equal(1);
          expect(next.getCall(0).args).to.deep.equal([err]);
        });
      });
    });

    context('error', () => {
      beforeEach(async () => {
        validate.returns('Enter a postcode');

        await post(req, res, next);
      });

      it('should call validate()', () => {
        expect(validate.callCount).to.equal(1);
        expect(validate.getCall(0).args).to.deep.equal([{}]);
      });

      it('should call res.render()', () => {
        expect(res.render.callCount).to.equal(1);
        expect(res.render.getCall(0).args).to.deep.equal(['index', {
          details: {},
          error: 'Enter a postcode',
        }]);
      });
    });
  });
});
