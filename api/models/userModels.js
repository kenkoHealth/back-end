// Bring in database for model queries
const db = require("../../data/dbConfig");

module.exports = {
  findUsers,
  findUserById,
  findBy,
  addUser,
  updateUser,
  destroyUser,
};

// Return a list of all users in the database
async function findUsers() {
  return db("users");
}
// Return a user based on ID of user
function findUserById(id) {
  return db("users").where({ id: id });
}
// Utility function to allow user login via email
function findBy(filter) {
  return db("users").where({ email: filter });
}
// Add a new user into the database
function addUser(newUser) {
  return db("users")
    .insert(newUser, "id")
    .then((id) => {
      return findUserById(id[0]);
    });
}
// Update user in database by ID
function updateUser(id, updatedUser) {
  return db("users")
    .where({ id })
    .update(updatedUser)
    .then(() => {
      return findUserById(id);
    });
}
// Remove a user from the database by ID
function destroyUser(id) {
  return db("users").where({ id }).del();
}
