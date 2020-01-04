exports.up = function(knex) {
    return knex.schema.createTable('Users', (table) => {
        table.string('id').unique()
        table.string('name')
        table.string('slug')
      })
};

exports.down = function(knex) {
    return knex.schema.raw('DROP TABLE "Users"')
};
