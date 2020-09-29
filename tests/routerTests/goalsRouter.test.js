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
    expect(goals.body).toBeDefined();
    expect(goals.body).toBeArray();
  });
});

// Test retrieving all goals for a specific user by specifying the user ID
describe("Successfully returns an array of all goals for a specific user", () => {
  it("Successfully returns an array of goals, and status code 200", async () => {
    const authenticated = await testUtils.authenticateForTest();
    const currentToken = authenticated.body.token;
    const goals = await request(server)
      .get(`/api/goals/${authenticated.body.current_user.id}`)
      .set("Cookie", currentToken);
    expect(goals.status).toBe(200);
    expect(goals.body).toBeDefined();
    expect(goals.body).toBeArray();
  });
  it("Request fails and returns status 401 if cookie is not sent in headers", async () => {
    const authenticated = await testUtils.authenticateForTest();
    const goals = await request(server).get(
      `/api/goals/${authenticated.body.current_user.id}`
    );
    expect(goals.status).toBe(400);
    expect(goals.body).toBeDefined();
    expect(goals.body).toEqual({
      message: `Please login and try again!`,
    });
  });
});
