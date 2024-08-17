const { expect } = require('chai');
const sinon = require('sinon');
const commandController = require('../../controllers/commandController');
const commandService = require('../../services/commandService');

describe('Command Controller', () => {
  describe('sendCommand', () => {
    it('should forward command and return status', async () => {
      const req = {
        body: {
          doorId: 'door123',
          encryptedCommand: 'encryptedCommandData',
        },
      };
      const res = {
        send: sinon.stub(),
        status: sinon.stub().returnsThis(),
      };

      const status = 'Command executed successfully';
      sinon.stub(commandService, 'forwardCommand').resolves(status);

      await commandController.sendCommand(req, res);

      expect(commandService.forwardCommand.calledOnceWith(req.body.doorId, req.body.encryptedCommand)).to.be.true;
      expect(res.send.calledOnceWith({ status })).to.be.true;

      commandService.forwardCommand.restore();
    });

    it('should return 500 if command forwarding fails', async () => {
      const req = {
        body: {
          doorId: 'door123',
          encryptedCommand: 'encryptedCommandData',
        },
      };
      const res = {
        send: sinon.stub(),
        status: sinon.stub().returnsThis(),
      };

      sinon.stub(commandService, 'forwardCommand').rejects(new Error('Service error'));

      await commandController.sendCommand(req, res);

      expect(commandService.forwardCommand.calledOnceWith(req.body.doorId, req.body.encryptedCommand)).to.be.true;
      expect(res.status.calledOnceWith(500)).to.be.true;
      expect(res.send.calledOnceWith('Failed to send command.')).to.be.true;

      commandService.forwardCommand.restore();
    });
  });

  describe('getStatus', () => {
    it('should return the status of the door', async () => {
      const req = {
        query: {
          doorId: 'door123',
        },
      };
      const res = {
        send: sinon.stub(),
        status: sinon.stub().returnsThis(),
      };

      const status = 'Door is locked';
      sinon.stub(commandService, 'getStatus').resolves(status);

      await commandController.getStatus(req, res);

      expect(commandService.getStatus.calledOnceWith(req.query.doorId)).to.be.true;
      expect(res.send.calledOnceWith({ status })).to.be.true;

      commandService.getStatus.restore();
    });

    it('should return 500 if getting status fails', async () => {
      const req = {
        query: {
          doorId: 'door123',
        },
      };
      const res = {
        send: sinon.stub(),
        status: sinon.stub().returnsThis(),
      };

      sinon.stub(commandService, 'getStatus').rejects(new Error('Service error'));

      await commandController.getStatus(req, res);

      expect(commandService.getStatus.calledOnceWith(req.query.doorId)).to.be.true;
      expect(res.status.calledOnceWith(500)).to.be.true;
      expect(res.send.calledOnceWith('Failed to get status.')).to.be.true;

      commandService.getStatus.restore();
    });
  });
});
