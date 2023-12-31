/*
 * All routes for Menu are defined here
 * Since this file is loaded in server.js into menu,
 *   these routes are mounted onto /menu
 */

const express = require('express');
const router = express.Router();
const { getAllMenuItems } = require('../db/queries/menu/01_getAllMenuItems');
const { getItemById } = require('../db/queries/menu/02_getItemById');
const { editMenuItem } = require('../db/queries/menu/03_editMenuItem');
const { addMenuItem } = require('../db/queries/menu/04_addMenuItem');
const { deleteMenuItem } = require('../db/queries/menu/05_deleteMenuItem');
const { getUserById, getUserByEmail } = require('../db/queries/users/getUser');
const { getOwnerMenus } = require('../db/queries/menu/06_getOwnermenus');
const db = require('../db/connection');

// USER ROUTES

// Retrieve a list of menus
router.get('/', (req, res) => {
  getUserById(req.session.userId)
    .then((data) => {
      const templateVars = { user: data };
      // Call the function to get all menu items
      getAllMenuItems()
        .then((menuItems) => {
          // Render the view to display the list of menu items
          // res.render('menu', { menuItems }, templateVars);
          res.render('menu', templateVars);

        })
        .catch((err) => {
          console.error(err);
          res.status(500).send(`Internal server error: ${err.message}`);
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`Internal server error: ${err.message}`);
    })
});

// View detailed information about a specific menu item
router.get('/:id', (req, res) => {
  const itemId = req.params.id; // Get the menu item ID from the URL

  // Call the function to get the menu item by ID
  getItemById(itemId)
    .then((menuItem) => {
      if (!menuItem) {
        res.status(404).send('Menu item not found');
      } else {
        res.render('menu/detail', { menuItem }); // Need to create the 'menu/detail' view later
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`Internal server error: ${err.message}`);
    });
});

// OWNER ROUTES

// Retrieve the owner's menus
router.get('/owner', (req, res) => {
  const userId = req.session.userId;

  // Call the getUserById function to get the user's information
  getUserById(userId)
    .then((user) => {
      if (!user) {
        res.status(404).send('User not found');
      } else if (user.restaurant_owner) {
        // If the user is a restaurant owner, retrieve the owner's menus
        getOwnerMenus(user.restaurant_id)
          .then((menus) => {
            res.render('ownerMenu', { menus, user });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).send(`Internal server error: ${err.message}`);
          });
      } else {
        res.status(403).send('Access denied: You are not a restaurant owner');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`Internal server error: ${err.message}`);
    });
});

// Edit a menu by ID
router.post('/:id/edit', (req, res) => {
  const itemId = req.params.id;
  const updateFields = req.body;

  // Call the function to edit the menu item
  editMenuItem(itemId, updateFields)
    .then((updatedMenuItem) => {
      if (!updatedMenuItem) {
        res.status(404).send('Menu item not found');
      } else {
        res.redirect(`/menu/${itemId}`);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`Internal server error: ${err.message}`);
    })
})

// Add a new menu item
router.post('/', (req, res) => {
  const { restaurantId, name, imgURL, description, category, price } = req.body;

  // Call the function to add a new menu item
  addMenuItem(restaurantId, name, imgURL, description, category, price)
    .then((newMenuItem) => {
      res.json({ message: 'Menu item added successfully', newItem: newMenuItem.rows[0] });
    }) // Adding a new menu item not only in the database. On the client side, after receiving the response, the new menu item is added to the top of the menu list
    .catch((err) => {
      console.err(err);
      res.status(500).send(`Internal server error: ${err.message}`);
    });
});

// Delete a menu item by ID
router.post('/:id/delete', (req, res) => {
  const itemId = req.params.id;

  // Call the function to delete the menu item by ID
  deleteMenuItem(itemId)
    .then((deletedMenuItem) => {
      if (!deletedMenuItem) {
        res.status(404).send('Menu item not found');
      } else {
        res.json({ message: 'Menu item deleted successfully', deletedItem: deletedMenuItem.rows[0] });
      } // On the client side, After successfully deleting a menu item in the route handler, a notification is sent to the client, a popup window showing information about the deleted menu item is displayed
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`Internal server error: ${err.message}`);
    });
});


module.exports = router;
