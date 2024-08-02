const { expect } = require('chai');
const authService = require('../../services/authService');

describe('Auth Service', () => {
  describe('validateUser', () => {
    it('should return user if email and websiteUrl match', async () => {
      const email = 'user@example.com';
      const websiteUrl = 'http://openlock.io';
      const user = await authService.validateUser(email, websiteUrl);
      
      expect(user).to.be.an('object');
      expect(user).to.have.property('email', email);
      expect(user).to.have.property('websiteUrl', websiteUrl);
    });

    it('should return undefined if email does not match', async () => {
      const email = 'nonexistent@example.com';
      const websiteUrl = 'http://openlock.io';
      const user = await authService.validateUser(email, websiteUrl);
      
      expect(user).to.be.undefined;
    });

    it('should return undefined if websiteUrl does not match', async () => {
      const email = 'user@example.com';
      const websiteUrl = 'http://notopenlock.io';
      const user = await authService.validateUser(email, websiteUrl);
      
      expect(user).to.be.undefined;
    });

    it('should return undefined if neither email nor websiteUrl match', async () => {
      const email = 'nonexistent@example.com';
      const websiteUrl = 'http://notopenlock.io';
      const user = await authService.validateUser(email, websiteUrl);
      
      expect(user).to.be.undefined;
    });
  });
});
