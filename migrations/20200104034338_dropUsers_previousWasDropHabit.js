
exports.up = function(knex) {
    return knex.schema.raw('DROP TABLE "Users"')
};

exports.down = function(knex) {
    return knex.schema.createTable('Users', (table) => {
        table.increments('id')
        table.string('name')
        table.string('slug')
      })
};
