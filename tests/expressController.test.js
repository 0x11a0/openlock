// const request = require("supertest");
// const app = require("../app"); // Adjust the path to your actual Express app instance

// describe("expressController", () => {
//   // Test unlock
//   describe("unlock", () => {
//     it("should unlock", async () => {
//       const response = await request(app).post("/api/esp32/unlock").send({
//         esp32Code: "A13",
//         password: "testpassword",
//         instruction: "open",
//       });

//       expect(response.status).toBe(200);
//       expect(response.body.message).toBe(
//         "WebSocket connection opened and message sent."
//       );
//     });
//   });
// });

const WebSocket = require("ws");
const sinon = require("sinon");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app"); // Replace with the path to your Express app
const wss = require("../websocketServer"); // Replace with the path to your WebSocket server

chai.use(chaiHttp);
const expect = chai.expect;

describe("WebSocket Broadcasting", () => {
  let server;

  before((done) => {
    // Start your Express server (your app)
    server = app.listen(3000, () => {
      console.log("Server started on port 3000");
      done();
    });
  });

  after(() => {
    // Stop your Express server after tests
    server.close();
  });

  it("should broadcast a message to WebSocket clients", (done) => {
    // Create a WebSocket client stub using sinon
    const wsStub = new WebSocket("ws://localhost:8080");

    // Create a spy on the WebSocket client's send method
    const sendSpy = sinon.spy(wsStub, "send");

    // Simulate receiving a POST request to your unlock endpoint
    chai
      .request(app)
      .post("/api/esp32/unlock") // Replace with your actual unlock endpoint
      .send({ message: "Test message" })
      .end((err, res) => {
        expect(res).to.have.status(200);

        // Wait for WebSocket server to process messages
        setTimeout(() => {
          // Verify that the message was sent to the WebSocket client
          expect(sendSpy.calledWith("unlock message from server")).to.be.true;
          expect(sendSpy.calledWith('{"message":"Test message"}')).to.be.true;

          // Restore the stub
          sendSpy.restore();
          done();
        }, 1000); // Adjust the delay as needed
      });
  });
});
