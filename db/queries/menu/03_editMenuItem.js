const db = require('../../connection');

const editMenuItem = (menuId, newName, newImgURL, newDescription, newCategory, newPrice) => {
  return db.query(`
    UPDATE menus
    SET name = $2, imgURL = $3, description = $4, category = $5, price = $6
    WHERE id = $1
    RETURNING *;
  `, [menuId, newName, newImgURL, newDescription, newCategory, newPrice]);
}

module.exports = { editMenuItem }


// Owner Routes
// Edit: POST /menus/:id/edit

// Purpose: Edit a menu item.
// Description: Restaurant owners can edit the information of a specific menu item.
