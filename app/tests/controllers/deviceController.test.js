const { expect } = require('chai');
const sinon = require('sinon');
const deviceController = require('../../controllers/deviceController');
const deviceService = require('../../services/deviceService');

describe('Device Controller', () => {
  describe('registerDevice', () => {
    it('should register device successfully', async () => {
      const req = {
        body: {
          doorId: 'door123',
          publicKey: 'publicKeyData',
        },
      };
      const res = {
        send: sinon.stub(),
        status: sinon.stub().returnsThis(),
      };

      sinon.stub(deviceService, 'registerDevice').resolves();

      await deviceController.registerDevice(req, res);

      expect(deviceService.registerDevice.calledOnceWith(req.body.doorId, req.body.publicKey)).to.be.true;
      expect(res.send.calledOnceWith('Device registered successfully.')).to.be.true;

      deviceService.registerDevice.restore();
    });

    it('should return 500 if device registration fails', async () => {
      const req = {
        body: {
          doorId: 'door123',
          publicKey: 'publicKeyData',
        },
      };
      const res = {
        send: sinon.stub(),
        status: sinon.stub().returnsThis(),
      };

      sinon.stub(deviceService, 'registerDevice').rejects(new Error('Service error'));

      await deviceController.registerDevice(req, res);

      expect(deviceService.registerDevice.calledOnceWith(req.body.doorId, req.body.publicKey)).to.be.true;
      expect(res.status.calledOnceWith(500)).to.be.true;
      expect(res.send.calledOnceWith('Failed to register device.')).to.be.true;

      deviceService.registerDevice.restore();
    });
  });

  describe('getPublicKey', () => {
    it('should return the public key of the device', async () => {
      const req = {
        query: {
          doorId: 'door123',
        },
      };
      const res = {
        send: sinon.stub(),
        status: sinon.stub().returnsThis(),
      };

      const publicKey = 'publicKeyData';
      sinon.stub(deviceService, 'getPublicKey').resolves(publicKey);

      await deviceController.getPublicKey(req, res);

      expect(deviceService.getPublicKey.calledOnceWith(req.query.doorId)).to.be.true;
      expect(res.send.calledOnceWith({ publicKey })).to.be.true;

      deviceService.getPublicKey.restore();
    });

    it('should return 404 if public key not found', async () => {
      const req = {
        query: {
          doorId: 'door123',
        },
      };
      const res = {
        send: sinon.stub(),
        status: sinon.stub().returnsThis(),
      };

      sinon.stub(deviceService, 'getPublicKey').resolves(null);

      await deviceController.getPublicKey(req, res);

      expect(deviceService.getPublicKey.calledOnceWith(req.query.doorId)).to.be.true;
      expect(res.status.calledOnceWith(404)).to.be.true;
      expect(res.send.calledOnceWith('Public key not found.')).to.be.true;

      deviceService.getPublicKey.restore();
    });

    it('should return 500 if retrieving public key fails', async () => {
      const req = {
        query: {
          doorId: 'door123',
        },
      };
      const res = {
        send: sinon.stub(),
        status: sinon.stub().returnsThis(),
      };

      sinon.stub(deviceService, 'getPublicKey').rejects(new Error('Service error'));

      await deviceController.getPublicKey(req, res);

      expect(deviceService.getPublicKey.calledOnceWith(req.query.doorId)).to.be.true;
      expect(res.status.calledOnceWith(500)).to.be.true;
      expect(res.send.calledOnceWith('Failed to retrieve public key.')).to.be.true;

      deviceService.getPublicKey.restore();
    });
  });
});
