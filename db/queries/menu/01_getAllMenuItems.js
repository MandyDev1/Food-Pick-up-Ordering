const db = require('../../connection');

const getAllMenuItems = () => {
  return db.query(`SELECT * FROM menus
  LIMIT 16;`)
};

module.exports = { getAllMenuItems };


// User Routes
// Browse: GET /menus

// Purpose: Retrieve a list of menus.
// Description: Unregistered users can view the restaurant's menu to select dishes.
