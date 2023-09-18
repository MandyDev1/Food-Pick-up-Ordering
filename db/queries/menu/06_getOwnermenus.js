const db = require('../../../db/connection');

// Function to retrieve menus for a specific restaurant (owner's menu)
const getOwnerMenus = (restaurantId) => {
  return db.query(`
    SELECT * FROM menus
    WHERE restaurant_id = $1;
  `, [restaurantId]);
};

module.exports = { getOwnerMenus };


// Owner's menu page route
// Browse: GET /menus/owner

// Purpose: Retrieve a list of menus.
// Description: The restaurant owner can view the restaurant's menu.
