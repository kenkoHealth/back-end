// Bring in database for model queries
const db = require("../../data/dbConfig");

module.exports = {
  findUser,
  findUserById,
  addUser,
  updateUser,
  destroyUser,
};

// Return a list of all users in the database
function findUser() {
  return db("users");
}
// Return a user based on ID of user
function findUserById(id) {
  return db("users").where({ id: id });
}
// Add a new user into the database
function addUser(newUser) {
  return db("users")
    .insert(newUser, "id")
    .then((id) => {
      return findUserById(id[0]);
    });
}
//update user by ID
function updateUser(id, updatedUser) {
  return db("users")
    .where({ id })
    .update(updatedUser)
    .then(() => {
      return findUserById(id);
    });
}
function destroyUser(id) {
  return db("users").where({ id }).del();
}
