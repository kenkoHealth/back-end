const testUtils = require("../testUtils/utilityUser");
const request = require("../../server");
const server = require("supertest");

// Test If we can receive all goals in the database
describe("Successfully returns an array of all goals in the database", () => {
  it("Successfully returns a status code 200", async () => {
    const authenticated = await testUtils.authenticateForTest();
    const currentToken = authenticated.body.token;
    const goals = await request(server)
      .get("/api/goals/")
      .set("cookie", currentToken);
    expect(goals.status).toBe(200);
  });
});
