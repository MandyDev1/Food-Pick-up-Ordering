const db = require('../../connection');
const bcrypt = require('bcrypt');

const registerUser = (user) => {
  const hashedPassword = bcrypt.hash(user.password, 10);

  return hashedPassword
    .then((hash) => {
      return db.query(`
      INSERT INTO users (email, password)
      VALUES ($1, $2)
        RETURNING *;
      `, [user.email, hash]);
    })
    .catch((error) => {
      console.error(error.message);
      throw new Error('Database error');
    });
};

module.exports = { registerUser };
