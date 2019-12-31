
exports.up = function (knex) {
    return knex.schema.alterTable('Habits', function (table) {
      table.foreign('user_id').references('Users.id')
    })
  }

exports.down = function(knex) {
    return knex.schema.alterTable('Habits', function (table) {
        table.dropColumn('userId')
      })
};
