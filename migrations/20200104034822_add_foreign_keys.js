
exports.up = function(knex) {
    return knex.schema.alterTable('Users', function (table) {
        table.dropColumn('id')
        table.dropColumn('name')
        table.dropColumn('slug')
      })
};

exports.down = function(knex) {
    return knex.schema.alterTable('Users', function (table) {
        table.bigInteger('id')
        table.string('name')
        table.string('slug')
      })
};
