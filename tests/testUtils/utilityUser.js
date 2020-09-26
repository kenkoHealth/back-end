// Generates a fake user and returns
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
// Function to authenticate a user
async function authenticateForTest() {
  const user = generateUser("KenkoTest5", "Erica", "Sims");
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
