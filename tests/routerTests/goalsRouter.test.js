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

// Test for the Retrieval of a specific goal by it's unique ID
describe("Sucessfully returns a goal object corresponding to given ID in request params", () => {
  it("Successfully returns a valid goal object, and status code 200", async () => {
    const authenticated = await testUtils.authenticateForTest();
    const currentToken = authenticated.body.token;
    const goals = await request(server)
      .get("/api/goals/")
      .set("Cookie", currentToken);
    // Map over goals.body and retrieve the id's to store in array
    const goalIDs = goals.body.map((goal) => {
      return goal.id;
    });
    // Randomly select an id and use to make request for a single goal.
    const randomID =
      Math.random() * (goalIDs[goalIDs.length - 1] - goalIDs[0]) + goalIDs[0];
    const singleGoal = await request(server)
      .get(`/api/goals/goal/${Math.floor(randomID)}`)
      .set("Cookie", currentToken);
    expect(singleGoal.status).toBe(200);
    expect(singleGoal.body).toBeDefined();
  });
  it("Successfully returns a correct error when passing in an ID that does not exist", async () => {
    const authenticated = await testUtils.authenticateForTest();
    const currentToken = authenticated.body.token;
    const randomID = Math.floor(Math.random() * 5000);
    const singleGoal = await request(server)
      .get(`/api/goals/goal/${randomID}`)
      .set("Cookie", currentToken);
    expect(singleGoal.status).toBe(404);
    expect(singleGoal.body).toEqual({
      message: `Goal with ID of ${randomID} does not exist.`,
    });
  });
});

// Test the ability to add a goal for a specific user
describe("Successfully adds a goal to logged in user", () => {
  it("Successfully returns the added goal object, and status code 200", async () => {
    const authenticated = await testUtils.authenticateForTest();
    const currentToken = authenticated.body.token;
  });
});
