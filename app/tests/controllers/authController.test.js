import { expect } from 'chai';
import request from 'supertest';
import express from 'express';
import authController from '../controllers/authController';
import authService from '../services/authService';
import sinon from 'sinon';

const app = express();
app.use(express.json());
app.post('/login', authController.login);

describe('Auth Controller', () => {
  let validateUserStub;

  before(() => {
    validateUserStub = sinon.stub(authService, 'validateUser');
  });

  after(() => {
    validateUserStub.restore();
  });

  it('should return a token for valid user', async () => {
    validateUserStub.withArgs('user@example.com', 'http://openlock.io').resolves({ email: 'user@example.com', websiteUrl: 'http://openlock.io' });

    const response = await request(app)
      .post('/login')
      .send({ email: 'user@example.com', websiteUrl: 'http://openlock.io' });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('token');
  });

  it('should return 400 for invalid user', async () => {
    validateUserStub.withArgs('invalid@example.com', 'http://invalid.io').resolves(null);

    const response = await request(app)
      .post('/login')
      .send({ email: 'invalid@example.com', websiteUrl: 'http://invalid.io' });

    expect(response.status).to.equal(400);
    expect(response.text).to.equal('Invalid email or website URL.');
  });
});
