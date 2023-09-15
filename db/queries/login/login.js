const db = require('../../connection');
const bcrypt = require('bcrypt');

const loginUser = (email, password) => {
  return db.query(`
    SELECT * FROM users
    WHERE email = $1;
  `, [email])
  .then((result) => {
    if (result.rows.length === 1) {
      const user = result.rows[0];
      return bcrypt.compare(password, user.password)
        .then((match) => {
          if (match) {
            return user;
          } else {
            throw new Error('Invalid email or password');
          }
        })
    } else {
      throw new Error('User not found');
    }
  })
  .catch((err) => {
    console.error(err.message);
    throw new Error('Database error');
  });
};

module.exports = { loginUser }
