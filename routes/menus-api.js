const express = require('express');
const router  = express.Router();
const menuQueries = require('../db/queries/menus');

router.get('/', (req, res) => {
  menuQueries.getAllMenuItems()
    .then(menus => {
      res.json({ result: menus.length, menus });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
