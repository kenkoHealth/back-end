const db = require("../../data/dbConfig");

module.exports = {
  getGoals,
  getGoalByUserId,
  getGoalById,
  addGoal,
  updateGoal,
  deleteGoal,
};

// Retrieve all Goals from all users
async function getGoals() {
  const result = await db.select("*").from("goals");
  return result;
}

// Retrieve goals from a specific user
async function getGoalByUserId(user_id) {
  const userGoals = await db("goals")
    .join("users", "users.id", "goals.goal_user")
    .select(
      "goals.id",
      "users.first_name",
      "goals.goal_name",
      "goals.goal_description",
      "goals.goal_date"
    )
    .where({ goal_user: user_id });
  return userGoals;
}

// Retrieve a goal by it's base ID
async function getGoalById(goal_id) {
  const goal = await db("goals").where({ id: goal_id }).first();
  return goal;
}

// Add a goal
async function addGoal(goal) {
  const addedGoal = await db("goals").insert(goal, "id");
  return getGoalById(addedGoal[0]);
}

// Update a goal
async function updateGoal(updatedGoal, id) {
  const newGoal = await db("goals").where({ id }).update(updatedGoal);
  return getGoalById(newGoal[0]);
}

// Delete a goal
async function deleteGoal(goal_id) {
  const deletedGoal = await db("goals").where({ id: goal_id }).del();
  return deletedGoal;
}
