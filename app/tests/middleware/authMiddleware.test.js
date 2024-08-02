const { expect } = require('chai');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../../middleware/authMiddleware');
const config = require('../../config');

describe('Auth Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      header: sinon.stub(),
    };
    res = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub(),
    };
    next = sinon.stub();
  });

  it('should return 401 if no token is provided', () => {
    req.header.returns(null);

    authMiddleware(req, res, next);

    expect(res.status.calledOnceWith(401)).to.be.true;
    expect(res.send.calledOnceWith('Access denied. No token provided.')).to.be.true;
    expect(next.notCalled).to.be.true;
  });

  it('should return 400 if token is invalid', () => {
    req.header.returns('invalidToken');

    sinon.stub(jwt, 'verify').throws(new Error('Invalid token'));

    authMiddleware(req, res, next);

    expect(res.status.calledOnceWith(400)).to.be.true;
    expect(res.send.calledOnceWith('Invalid token.')).to.be.true;
    expect(next.notCalled).to.be.true;

    jwt.verify.restore();
  });

  it('should call next if token is valid', () => {
    const user = { id: 1, email: 'test@example.com' };
    req.header.returns('validToken');

    sinon.stub(jwt, 'verify').returns(user);

    authMiddleware(req, res, next);

    expect(jwt.verify.calledOnceWith('validToken', config.jwtSecret)).to.be.true;
    expect(req.user).to.equal(user);
    expect(next.calledOnce).to.be.true;

    jwt.verify.restore();
  });
});
