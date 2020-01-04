
exports.up = function(knex) {
    return knex.schema.createTable('Habits', (table) => {
        table.increments('id')
        table.integer('user_id')
        table.string('habit')
      })
};

exports.down = function(knex) {
    return knex.schema.raw('DROP TABLE "Habits"')
};
