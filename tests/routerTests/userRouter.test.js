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

// Could write another utility function to register/login a user to help clean up test code a bit
async function authenticateForTest() {
  const user = generateUser("KenkoTest5", "Erica", "Sims");
  const response = await request(server).post("/api/auth/register").send(user);
  console.log(response);

  const login = await request(server).post("/api/auth/login").send({
    email: user.email,
    password: user.password,
  });
  return login;
}
// Test get all users endpoint. (Routes are protected, will need to register and login in order to access)
describe("Successfully returns an array of all users", () => {
  it("Successfully returns status code 200 on request", async () => {
    let authenticated = await authenticateForTest();
    const currentToken = authenticated.body.token;
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
    let authenticated = await authenticateForTest();
    const currentToken = authenticated.body.token;
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
    let authenticated = await authenticateForTest();
    const currentToken = authenticated.body.token;
    let updateSingleUser = await request(server)
      .put(`/api/users/${authenticated.body.current_user.id}`)
      .set("Authorization", currentToken)
      .send({ first_name: `Sam` });
    expect(updateSingleUser.status).toBe(200);
    expect(updateSingleUser.body).toEqual({
      Message: `User profile ${authenticated.body.current_user.first_name} ${authenticated.body.current_user.last_name} successfully updated.`,
    });
  });
});

// Test if we can successfully delete a user
describe("Test deleting a user from the database by ID", () => {
  it("Successfully deletes a user and returns status code 200", async () => {
    let authenticated = await authenticateForTest();
    const currentToken = authenticated.body.token;
    let deleteSingleUser = await request(server)
      .delete(`/api/users/${authenticated.body.current_user.id}`)
      .set("Authorization", currentToken);
    const successfulDelete = typeof deleteSingleUser.body;
    expect(deleteSingleUser.status).toBe(200);
    expect(deleteSingleUser.body).toEqual({
      Message: `You have successfully removed the user with the id ${authenticated.body.current_user.id}`,
    });
    expect(deleteSingleUser.body).toBeType(successfulDelete, "object");
  });
});

//
