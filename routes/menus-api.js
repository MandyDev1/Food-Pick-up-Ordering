/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const menuQueries = require('../db/queries/menu/01_getAllMenuItems');
const menuDetails = require('../db/queries/menu/02_getItemById');

router.get('/', (req, res) => {
  menuQueries.getAllMenuItems()
    .then(menus => {
      res.json({ menus });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


router.get('/:id', (req, res) => {
  menuDetails.getItemById(req.params.id)
    .then(menus => {
      res.json({ menus });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
