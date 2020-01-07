
exports.seed = function(knex) {
  const faker = require('faker')
  const userIDs = []
  for (let idx = 1; idx < 9; idx++) {
    const userID = "000000000000" + idx.toString()
    userIDs.push(userID)
  }
  const fakeData = []
  const userCount = 30
  const randomUserId = (max) => { return (Math.floor(Math.random() * max) )}
  for (let idx = 0; idx < userCount; idx++) {
    const fakeHabit = faker.lorem.words()
    fakeData.push({
      id: idx.toString(),
      user_id: userIDs[randomUserId(8)],
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
