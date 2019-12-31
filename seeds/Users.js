
exports.seed = function(knex) {
  const slugify = (word) => {
    let slugified = word
    .replace(/\s/g, '-')
    .replace(/'/g, '')
    .toLowerCase()
    return slugified
  }
  // Deletes ALL existing entries
  return knex('Users').del()
    .then(function () {
      // Inserts seed entries
      return knex('Users').insert([
        {
          id: 1, 
          name: 'Ti Jay', 
          slug: slugify('ti-jay')
        },
        {
          id: 2, 
          name: 'Fal', 
          slug: slugify('fal')
        },
        {
          id: 3, 
          name: 'Farrah', 
          slug: slugify('farrah')
        },
        {
          id: 4, 
          name: 'Adam', 
          slug: slugify('adam')
        }
      ]);
    });
};
