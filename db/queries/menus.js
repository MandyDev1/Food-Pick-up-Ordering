const db = require('../connection');

const getAllMenuItems = () => {
  return db.query('SELECT * FROM menus')
    .then(data => {
      return data.rows;
    });
};

const getMenuItemById = (id) => {
  return db.query(`SELECT * FROM menus
        WHERE id = $1;`, [id])
        .then(data => data.rows[0]);
};

const getMenuItemByCategory = (category) => {
  return db.query(`SELECT * FROM menus
        WHERE category = $1;`, [category])
        .then(data => data.rows);
};

module.exports = { getAllMenuItems, getMenuItemById, getMenuItemByCategory };
