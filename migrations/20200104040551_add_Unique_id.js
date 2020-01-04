
exports.up = function(knex) {
    return knex.schema.raw('DROP TABLE "Habits"')
}

exports.down = function(knex) {
    return knex.schema.raw('DROP TABLE "Habits"')
}
