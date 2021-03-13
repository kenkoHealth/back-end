// User Factory class to quickly seed database user faker data
const { v4: uuidv4 } = require("uuid");
const faker = require("faker");
/* 
    - Base factory function to build a user instance
    - We can pass the user_type <-- To do -- and number of creations we want
    - Will return an array of user objects

*/
function createUsers(instances) {
  let iterations = 0;
  let createdUsersArray = [];
  while (iterations < instances) {
    createdUsersArray.push({
      id: uuidv4(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
    });
    iterations += 1;
  }
  return createdUsersArray;
}

module.exports = {
  createUsers,
};
