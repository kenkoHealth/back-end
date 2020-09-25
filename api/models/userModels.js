// Bring in database for model queries
const db = require("../../data/dbConfig");
const { getGoalById } = require("./goalModels");

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
  const results = await db.select("*").from("users");
  return results;
}
// Return a user based on ID of user
async function findUserById(id) {
  const result = await db("users").where({ id: id }).first();
  return result;
}
// Utility function to allow user login via email
async function findBy(filter) {
  const result = await db("users").where({ email: filter });
  return result;
}
// Add a new user into the database
async function addUser(newUser) {
  const addedUser = await db("users").insert(newUser, "id");
  return findUserById(addedUser[0]);
}
// Update user in database by ID
// ** NEED TO FIGURE OUT WHY THIS DOESN'T WORK **
async function updateUser(id, updatedUser) {
  const newUser = await db("users").where({ id }).update(updatedUser);
  return findUserById(newUser[0]);
}
// Remove a user from the database by ID
async function destroyUser(id) {
  const deletedUser = await db("users").where({ id }).del();
  return getGoalById(deletedUser);
}
