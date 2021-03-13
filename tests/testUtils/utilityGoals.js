const faker = require("faker");
const { v4: uuidv4 } = require("uuid");

function generateGoal(user_id) {
  return {
    id: uuidv4(),
    goal_name: faker.lorem.word(),
    goal_description: faker.lorem.sentences(2),
    goal_date: faker.date.soon(30),
    goal_user: user_id,
  };
}

module.exports = {
  generateGoal,
};
