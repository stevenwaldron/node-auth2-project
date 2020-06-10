
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
       {username: 'waldron01', password: 'etu485toerdrgdhgdghddf', department: 'mens 1'}
      ]);
    });
};
