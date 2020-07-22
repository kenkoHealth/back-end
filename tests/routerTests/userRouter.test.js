// User Routes tests
const request = require("supertest");
const server = require("../../server");

// Utility function to generate test users
function generateUser(pass, first, last) {
  const randomUserNum = Math.random() * 5000;
  let testUser = {
    email: `kenkoTest${randomUserNum}@email.com`,
    password: pass,
    first_name: first,
    last_name: last,
  };
  return testUser;
}
// Test get all users endpoint. (Routes are protected, will need to register and login in order to access)
describe("Successfully returns an array of all users", () => {
  it("Successfully returns status code 200 on request", async () => {
    let user = generateUser("kenkoTest1", "Aaron", "Gillies");
    let response = await request(server).post("/api/auth/register").send(user);

    let login = await request(server).post("/api/auth/login").send({
      email: user.email,
      password: user.password,
    });
    const currentToken = login.body.token;
    let getUsers = await request(server)
      .get("/api/users/")
      .set("Authorization", currentToken);
    const resType = typeof getUsers.body;
    expect(getUsers.status).toBe(200);
    expect(getUsers.body).toBeType(resType, "object");
    expect(getUsers.body.length).toBeGreaterThanOrEqual(0);
  });
});

// Test getting a specific user by ID
describe("Test get an individual user from database", () => {
  it("Successfully returns an array of length 1 with a status code of 200", async () => {
    let user = generateUser("kenkoTest2", "Andrew", "Smith");
    let response = await request(server).post("/api/auth/register").send(user);

    let login = await request(server).post("/api/auth/login").send({
      email: user.email,
      password: user.password,
    });
    const currentToken = login.body.token;
    let getSingleUser = await request(server)
      .get("/api/users/1")
      .set("Authorization", currentToken);
    expect(getSingleUser.status).toBe(200);
    expect(getSingleUser.body.length).toEqual(1);
  });
});

// Test Update a user

describe("Test updating a specific user in the database", () => {
  it("Successfully updates the user and returns status code 200", async () => {
    let user = generateUser("kenkoTest3", "Eric", "Johnson");
    let response = await request(server).post("/api/auth/register").send(user);

    let login = await request(server).post("/api/auth/login").send({
      email: user.email,
      password: user.password,
    });
    const currentToken = login.body.token;
    let updateSingleUser = await request(server)
      .put(`/api/users/${login.body.current_user.id}`)
      .set("Authorization", currentToken)
      .send({ first_name: `Sam` });
    expect(updateSingleUser.status).toBe(200);
  });
});
