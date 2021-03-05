const faker = require("faker");

function generateGoal(user_id) {
  return {
    goal_name: faker.lorem.word(),
    goal_description: faker.lorem.sentences(2),
    goal_date: faker.date.soon(30),
    goal_user: user_id,
  };
}

module.exports = {
  generateGoal,
};
