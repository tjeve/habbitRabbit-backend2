
exports.seed = function(knex) {
  const faker = require('faker')
  const fakeData = []
  const userCount = 10
  const fakerName = faker.name.findName()
  const fakerSlug = (name) => {
    return (name
    .replace(/\s/g, '-')
    .replace(/'/g, '')
    .toLowerCase()
    )
  }
  for (let idx = 0; idx < userCount; idx++) {
    const fakerName = faker.name.findName()
    const fakerSlug = (name) => {
      return name
      .replace(/\s/g, '-')
      .replace(/'/g, '')
      .toLowerCase()
    }
    fakeData.push({
      id: idx.toString(),
      name: fakerName,
      slug: fakerSlug,
    })
  }
  // Deletes ALL existing entries
  return knex('Users').del()
    .then(function () {
      // Inserts seed entries
      return knex('Users').insert([
        {
          id: "0000000000001",
          name: faker.name.findName(),
          slug: fakerSlug(faker.random.words()),
        },
        {
          id: "0000000000002",
          name: faker.name.findName(),
          slug: fakerSlug(faker.random.words()),
        },
        {
          id: "0000000000003",
          name: faker.name.findName(),
          slug: fakerSlug(faker.random.words()),
        },
        {
          id: "0000000000004",
          name: faker.name.findName(),
          slug: fakerSlug(faker.random.words()),
        },
        {
          id: "0000000000005",
          name: faker.name.findName(),
          slug: fakerSlug(faker.random.words()),
        },
        {
          id: "0000000000006",
          name: faker.name.findName(),
          slug: fakerSlug(faker.random.words()),
        },
        {
          id: "0000000000007",
          name: faker.name.findName(),
          slug: fakerSlug(faker.random.words()),
        },
        {
          id: "0000000000008",
          name: faker.name.findName(),
          slug: fakerSlug(faker.random.words()),
        },
      ]);
    });
};
