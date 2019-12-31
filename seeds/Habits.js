
exports.seed = function(knex) {
  const faker = require('faker')
  const fakeData = []
  const userCount = 30
  const randomUserId = (max) => { return (Math.floor(Math.random() * max) + 1 )}
  for (let idx = 0; idx < userCount; idx++) {
    const fakeHabit = faker.lorem.words()
    fakeData.push({
      id: idx,
      user_id: randomUserId(9),
      habit: fakeHabit,
    })
  }
  // Deletes ALL existing entries
  return knex('Habits')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('Habits').insert(fakeData);
    });
};
