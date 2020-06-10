
exports.up = function(knex) {
  return knex.schema.createTable('users', (tbl) => {
      tbl.increments('id');
      tbl.text('username')
        .unique()
        .notNullable()
      tbl.text("password")
        .unique()
        .notNullable()
      tbl.text('department')
        .notNullable()
      
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
