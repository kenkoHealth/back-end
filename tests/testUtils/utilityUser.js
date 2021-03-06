const request = require("supertest");
const server = require("../../server");
const faker = require("faker");
const { v4: uuidv4 } = require("uuid");

function generateUser() {
  let testUser = {
    id: uuidv4(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
  };
  return testUser;
}

async function authenticateForTest() {
  const user = generateUser();
  const response = await request(server).post("/api/auth/register").send(user);

  const login = await request(server).post("/api/auth/login").send({
    email: user.email,
    password: user.password,
  });
  return login;
}

module.exports = {
  generateUser,
  authenticateForTest,
};
