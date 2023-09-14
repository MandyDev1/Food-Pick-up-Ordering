const db = require('../../connection');

const editMenuItem = (menuId, updateFields) => {
  const { name, imgURL, description, category, price } = updateFields;
  const queryParams = [menuId];
  let queryString = `UPDATE menus SET `;

  if (name !== undefined) {
    queryParams.push(name);
    queryString += `name = $${queryParams.length}, `;
  }

  if (imgURL !== undefined) {
    queryParams.push(imgURL);
    queryString += `imgURL = $${queryParams.length}, `;
  }

  if (description !== undefined) {
    queryParams.push(description);
    queryString += `description = $${queryParams.length}, `;
  }

  if (category !== undefined) {
    queryParams.push(category);
    queryString += `category = $${queryParams.length}, `;
  }

  if (price !== undefined) {
    queryParams.push(price);
    queryString += `price = $${queryParams.length}, `;
  }

  // Remove the trailing comma and add the WHERE clause.
  queryString = queryString.slice(0, -2); // Remove the last ", "
  queryString += ` WHERE id = $1 RETURNING *;`;

  console.log(queryString, queryParams);

  return db
    .query(queryString, queryParams)
    .then((res) => res.rows)
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { editMenuItem }


// Owner Routes
// Edit: POST /menus/:id/edit

// Purpose: Edit a menu item.
// Description: Restaurant owners can edit the information of a specific menu item.
