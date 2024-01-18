const request = require("supertest");
const app = require("../app"); // Adjust the path to your actual Express app instance

describe("expressController", () => {
  // Test unlock
  describe("unlock", () => {
    it("should unlock", async () => {
      const response = await request(app).post("/api/esp32/unlock").send({
        esp32Code: "A13",
        password: "testpassword",
        instruction: "open",
      });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe(
        "WebSocket connection opened and message sent."
      );
    });
  });
});
