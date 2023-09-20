const db = require('../../connection');

const getItemById = (id) => {
  return db.query(`SELECT * FROM menus
  WHERE id = $1;`, [id])
  .then((result) => {
    return result.rows[0];
  })
}

module.exports = { getItemById }


// User Routes
// Read: GET /menus/:id

// Purpose: View detailed information about a specific menu item.
// Description: Only registered users can view detailed information about a particular menu item.
