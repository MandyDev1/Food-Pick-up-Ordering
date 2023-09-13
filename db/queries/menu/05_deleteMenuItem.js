const db = require('../../connection');

const deleteMenuItem = (menuId) => {
  return db.query(`
    DELETE FROM menus
    WHERE id = $1
    RETURNING *;
  `, [menuId]);
}

module.exports = { deleteMenuItem }


// Owner Routes
// Delete: POST /menus/:id/delete

// Purpose: Delete a menu item.
// Description: Restaurant owners can remove a specific menu item.
