exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          email: "ackers@test.com",
          password: "password1",
          first_name: "Andrew",
          last_name: "Ackers",
        },
        {
          id: 2,
          email: "aaron@test.com",
          password: "password2",
          first_name: "Aaron",
          last_name: "Gillies",
        },
        {
          id: 3,
          email: "kai@test.com",
          password: "password3",
          first_name: "Kai",
          last_name: "Haskell",
        },
      ]);
    });
};
