const db = require('../../connection');

const getAllMenuItems = (db) => {
  return db.query(`SELECT * FROM menus
  ORDER BY id ASC
  LIMIT 16;`)
};

module.exports = { getAllMenuItems };


// User Routes
// Browse: GET /menus

// Purpose: Retrieve a list of menus.
// Description: Unregistered users can view the restaurant's menu to select dishes.
