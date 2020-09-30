function generateGoal(name, description, date, user) {
  return {
    goal_name: name,
    goal_description: description,
    goal_date: date,
    goal_user: user,
  };
}

module.exports = {
  generateGoal,
};
