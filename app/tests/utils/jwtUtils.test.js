const { expect } = require('chai');
const jwt = require('jsonwebtoken');
const jwtUtils = require('../../utils/jwtUtils');
const config = require('../../config');

describe('JWT Utils', () => {
  const payload = { email: 'user@example.com', websiteUrl: 'http://openlock.io' };
  let token;

  before(() => {
    // Generate a token before running the tests
    token = jwtUtils.generateToken(payload);
  });

  describe('generateToken', () => {
    it('should generate a valid JWT token', () => {
      const decoded = jwt.verify(token, config.jwtSecret);
      expect(decoded).to.include(payload);
    });

    it('should set the token expiration to 1 hour', () => {
      const decoded = jwt.decode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      const expiresIn = decoded.exp - currentTime;
      expect(expiresIn).to.be.closeTo(3600, 5); // 1 hour in seconds
    });
  });

  describe('verifyToken', () => {
    it('should verify a valid token and return the payload', () => {
      const decoded = jwtUtils.verifyToken(token);
      expect(decoded).to.include(payload);
    });

    it('should return null for an invalid token', () => {
      const invalidToken = 'invalid.token.string';
      const decoded = jwtUtils.verifyToken(invalidToken);
      expect(decoded).to.be.null;
    });

    it('should return null for an expired token', (done) => {
      const expiredToken = jwt.sign(payload, config.jwtSecret, { expiresIn: '1ms' });

      setTimeout(() => {
        const decoded = jwtUtils.verifyToken(expiredToken);
        expect(decoded).to.be.null;
        done();
      }, 10); // Wait for the token to expire
    });
  });
});
