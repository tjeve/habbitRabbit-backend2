
exports.seed = function(knex) {
  const faker = require('faker')
  const fakeData = []
  const userCount = 10
  for (let idx = 0; idx < userCount; idx++) {
    const fakerName = faker.name.findName()
    const fakerSlug = fakerName
      .replace(/\s/g, '-')
      .replace(/'/g, '')
      .toLowerCase()
    fakeData.push({
      id: idx+9999999,
      name: fakerName,
      slug: fakerSlug,
    })
  }
  // Deletes ALL existing entries
  return knex('Users').del()
    .then(function () {
      // Inserts seed entries
      return knex('Users').insert(fakeData);
    });
};
