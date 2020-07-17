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
    expect(getUsers.status).toBe(200);
  });
});
