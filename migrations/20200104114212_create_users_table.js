
exports.up = function(knex) {
    return knex.schema.createTable('Habits', (table) => {
        table.increments('id')
        table.string('user_id')
        table.string('habit')
        table.timestamp('start_date').defaultTo(knex.fn.now())
      })
};

exports.down = function(knex) {
    return knex.schema.raw('DROP TABLE "Habits"')
};
