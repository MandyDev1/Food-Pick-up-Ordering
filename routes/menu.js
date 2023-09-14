/*
 * All routes for Menu are defined here
 * Since this file is loaded in server.js into menu,
 *   these routes are mounted onto /menu
 */

const express = require('express');
const router  = express.Router();
const { cookie } = require('express/lib/response');
const { getAllMenuItems } = require('../db/queries/menu/01_getAllMenuItems');
const { getItemById } = require('../db/queries/menu/02_getItemById');
const { editMenuItem } = require('../db/queries/menu/03_editMenuItem');
const { addMenuItem } = require('../db/queries/menu/04_addMenuItem');
const { deleteMenuItem } = require('../db/queries/menu/05_deleteMenuItem');
const db = require('../db/connection');

// Retrieve a list of menus
router.get('/', (req, res) => {
  // Call the function to get all menu items
  getAllMenuItems(db)
  .then((menuItems) => {
    // Render the view to display the list of menu items
    res.render('menu/list', { menuItems }); // Need to create the 'menu/list' view later
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Internal server error');
  });
});

// View detailed information about a specific menu item
router.get('/:id', (req, res) => {
  const itemId = req.params.id; // Get the menu item ID from the URL

  // Call the function to get the menu item by ID
  getItemById(db, itemId)
  .then((menuItem) => {
    if (!menuItem) {
      res.status(404).send('Menu item not found');
    } else {
      res.render('menu/detail', { menuItem }); // Need to create the 'menu/detail' view later
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Internal server error');
  });
});


module.exports = router;
