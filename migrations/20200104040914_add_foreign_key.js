
exports.up = function (knex) {
    return knex.schema.raw('DROP TABLE "Users"')
  }

exports.down = function(knex) {
    return knex.schema.raw('DROP TABLE "Users"')
};