const db = require('../../connection');

const getUserById = (id) => {
  return db.query(`
    SELECT * FROM users
    WHERE id = $1;
  `, [id]);
}

const getUserByEmail = (email) => {
  return db.query(`
    SELECT * FROM users
    WHERE email = $1;
  `, [email]);
}

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getUsers, getUserById, getUserByEmail };
