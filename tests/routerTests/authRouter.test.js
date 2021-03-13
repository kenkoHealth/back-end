const request = require("supertest");
const server = require("../../server");
const userUtility = require("../testUtils/utilityUser");

// Test successful user registration.
describe("User should be able to successfully register", () => {
  it("Should successfully register a user and return status code 201", async () => {
    let response = await request(server)
      .post("/api/auth/register")
      .send(userUtility.generateUser());
    expect(response.status).toBe(201);
  });
  it("Should return a valid token", async () => {
    let response = await request(server)
      .post("/api/auth/register")
      .send(userUtility.generateUser());
    expect(response.body.token).toBeUndefined();
  });
  it("Should fail if incorrect request body is sent", async () => {
    let response = await request(server).post("/api/auth/register").send({
      password: "KenkoTest",
      first_name: "Aaron",
      last_name: "Gillies",
    });
    expect(response.status).toBe(500);
  });
});

// Test successful user login
describe("User should be able to successfully login after registering", () => {
  it("Should successfully register and login returning status 200, as well as valid token", async () => {
    // Need to register a user here before we login.
    let testUser = userUtility.generateUser();
    let response = await request(server)
      .post("/api/auth/register")
      .send(testUser);
    // Here, we login with credentials we registered above.
    let login = await request(server).post("/api/auth/login").send({
      email: testUser.email,
      password: testUser.password,
    });
    let tokenType = typeof login.body.token;
    expect(login.status).toBe(200);
    expect(login.body.token).toBeDefined();
    expect(login.body.token).toBeType(tokenType, "string");
    expect(login.body.Message).toEqual(
      `Welcome ${testUser.first_name} ${testUser.last_name}!`
    );
  });
  it("Should return a status code 401 if user is not properly authenticated", async () => {
    let testUser = userUtility.generateUser();
    let login = await request(server).post("/api/auth/login").send({
      email: "kenkotest@email.com",
      password: testUser.password,
    });
    expect(login.status).toBe(401);
    expect(login.body).toEqual({ message: "Invalid credentials provided!" });
  });
});
