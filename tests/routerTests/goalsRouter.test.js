const testUtils = require("../testUtils/utilityUser");
const request = require("supertest");
const server = require("../../server");

// Test If we can receive all goals in the database
describe("Successfully returns an array of all goals in the database", () => {
  it("Successfully returns an array of goals, and status code 200", async () => {
    const authenticated = await testUtils.authenticateForTest();
    const currentToken = authenticated.body.token;
    let goals = await request(server)
      .get("/api/goals/")
      .set("Cookie", currentToken);
    expect(goals.status).toBe(200);
    expect(goals.body).toBeArray();
  });
});
