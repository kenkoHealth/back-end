const request = require("supertest");
const server = require("../../server");

// Test Register endpoint

// Test successful user registration.
describe("User should be able to successfully register", () => {
  it("Should successfully register a user and return status code 201", async () => {
    const randomUserNum = Math.random() * 5000;
    let response = await request(server)
      .post("/api/auth/register")
      .send({
        email: `KenkoTest${randomUserNum}@email.com`,
        password: "KenkoTest",
        first_name: "Aaron",
        last_name: "Gillies",
      });
    expect(response.status).toBe(201);
  });
  it("Should return a valid token", async () => {
    const randomUserNum = Math.random() * 5000;
    let response = await request(server)
      .post("/api/auth/register")
      .send({
        email: `KenkoTest${randomUserNum}@email.com`,
        password: "KenkoTest",
        first_name: "Aaron",
        last_name: "Gillies",
      });
    let tokenType = typeof response.body.token;
    expect(response.body.token).toBeDefined();
    expect(response.body.token).toBeType(tokenType, "string");
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
