exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("goals")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("goals").insert([
        {
          id: 1,
          goal_name: "Lose weight",
          goal_description: "I'd like to lose 20 pounds by November 1st",
          goal_date: "2020-11-01",
          goal_user: 1,
        },
        {
          id: 2,
          goal_name: "Eat healthier",
          goal_description: "I'd like to completely cut out carbs by Christmas",
          goal_date: "2020-12-25",
          goal_user: 2,
        },
        {
          id: 3,
          goal_name: "Quit Drinking",
          goal_description: "I'd like to quite drinking by this time next year",
          goal_date: "2021-09-17",
          goal_user: 3,
        },
      ]);
    });
};
