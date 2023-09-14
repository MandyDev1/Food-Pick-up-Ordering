const db = require('../../connection');

const editMenuItem = (menuId, updateFields) => {
  const { name, imgURL, description, category, price } = updateFields;
  const queryParams = [menuId];
  let queryString = `UPDATE menus SET `;
  let hasFieldsToUpdate = false;

  if (name !== undefined) {
    queryParams.push(name);
    queryString += `name = $${queryParams.length}, `;
    hasFieldsToUpdate = true;
  }

  if (imgURL !== undefined) {
    queryParams.push(imgURL);
    queryString += `imgURL = $${queryParams.length}, `;
    hasFieldsToUpdate = true;
  }

  if (description !== undefined) {
    queryParams.push(description);
    queryString += `description = $${queryParams.length}, `;
    hasFieldsToUpdate = true;
  }

  if (category !== undefined) {
    queryParams.push(category);
    queryString += `category = $${queryParams.length}, `;
    hasFieldsToUpdate = true;
  }

  if (price !== undefined) {
    queryParams.push(price);
    queryString += `price = $${queryParams.length}, `;
    hasFieldsToUpdate = true;
  }

  if (hasFieldsToUpdate) {
    queryString = queryString.slice(0, -2); // Remove the last ", "
    queryString += ` WHERE id = $1 RETURNING *;`;
  } else {
    throw new Error('No fields to update.');
  }

  console.log(queryString, queryParams);

  return db
    .query(queryString, queryParams)
    .then((res) => res.rows)
    .catch((err) => {
      console.error(err.message);
      throw new Error('Database error.');
    });
};

module.exports = { editMenuItem }


// Owner Routes
// Edit: POST /menus/:id/edit

// Purpose: Edit a menu item.
// Description: Restaurant owners can edit the information of a specific menu item.
