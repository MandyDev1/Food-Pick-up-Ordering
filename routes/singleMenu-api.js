const express = require('express');
const router  = express.Router();
const menuQueries = require('../db/queries/menus');

router.get('/:id', (req, res) => {
  menuQueries.getMenuItemById(req.params.id)
    .then(menu => {
      res.json({ menu });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
