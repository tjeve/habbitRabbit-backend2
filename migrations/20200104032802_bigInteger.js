
exports.up = function(knex) {
    return knex.schema.table('Users', table => {
        table.bigInteger('id')
      })
};

exports.down = function(knex) {
    return knex.schema.createTable('Users', (table) => {
        table.increments('id')
        table.string('name')
        table.string('slug')
      })
};
