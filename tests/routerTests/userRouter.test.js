const testUtils = require("../testUtils/utilityUser");

// User Routes tests
const request = require("supertest");
const server = require("../../server");

// Test get all users endpoint. (Routes are protected, will need to register and login in order to access)
describe("Successfully returns an array of all users", () => {
  it("Successfully returns status code 200 on request", async () => {
    let authenticated = await testUtils.authenticateForTest();
    const currentToken = authenticated.body.token;
    let getUsers = await request(server)
      .get("/api/users/")
      .set("Cookie", currentToken);
    const resType = typeof getUsers.body;
    expect(getUsers.status).toBe(200);
    expect(getUsers.body).toBeType(resType, "object");
    expect(getUsers.body.length).toBeGreaterThanOrEqual(0);
  });
});

// Test getting a specific user by ID
describe("Test get an individual user from database", () => {
  it("Successfully returns an array of length 1 with a status code of 200", async () => {
    let authenticated = await testUtils.authenticateForTest();
    const currentToken = authenticated.body.token;
    let getSingleUser = await request(server)
      .get(`/api/users/${authenticated.body.current_user.id}`)
      .set("Cookie", currentToken);
    expect(getSingleUser.status).toBe(200);
    expect(getSingleUser.body).toBeDefined();
  });
});

// Test Update a user
describe("Test updating a specific user in the database", () => {
  it("Successfully updates the user and returns status code 200", async () => {
    let authenticated = await testUtils.authenticateForTest();
    const currentToken = authenticated.body.token;
    let updateSingleUser = await request(server)
      .put(`/api/users/${authenticated.body.current_user.id}`)
      .set("Cookie", currentToken)
      .send({ first_name: `Sam` });
    expect(updateSingleUser.status).toBe(200);
    expect(updateSingleUser.body).toEqual({
      Message: `User profile with ID of ${authenticated.body.current_user.id} successfully updated.`,
    });
  });
});

// Test if we can successfully delete a user
describe("Test deleting a user from the database by ID", () => {
  it("Successfully deletes a user and returns status code 200", async () => {
    let authenticated = await testUtils.authenticateForTest();
    const currentToken = authenticated.body.token;
    let deleteSingleUser = await request(server)
      .delete(`/api/users/${authenticated.body.current_user.id}`)
      .set("Cookie", currentToken);
    const successfulDelete = typeof deleteSingleUser.body;
    expect(deleteSingleUser.status).toBe(200);
    expect(deleteSingleUser.body).toEqual({
      message: `Successfully deleted user with the ID of ${authenticated.body.current_user.id}.`,
    });
    expect(deleteSingleUser.body).toBeType(successfulDelete, "object");
  });
  it("Successfully returns a failure for incorrect user ID passed in", async () => {
    let authenticated = await testUtils.authenticateForTest();
    const currentToken = authenticated.body.token;
    let deleteSingleUser = await request(server)
      .delete(`/api/users/${Math.random() * 5000}`)
      .set("Cookie", currentToken);
    expect(deleteSingleUser.status).toBe(500);
  });
});
