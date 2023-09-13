const db = require('../../connection');

const addMenuItem = (restaurantId, name, imgURL, description, category, price) => {
  return db.query(`
    INSERT INTO menus (restaurant_id, name, imgURL, description, category, price)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `, [restaurantId, name, imgURL, description, category, price]);
}

module.exports = { addMenuItem }


// Owner Routes
// Add: POST /menus

// Purpose: Add a new menu item.
// Description: Restaurant owners can add new dishes to the menu.
