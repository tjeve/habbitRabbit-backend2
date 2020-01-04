
exports.up = function(knex) {
    return knex.schema.alterTable('Habits', function (table) {
        table.timestamp('start_date').defaultTo(knex.fn.now())
      })
};

exports.down = function(knex) {
    return knex.schema.raw('DROP TABLE "Habits"')
};
