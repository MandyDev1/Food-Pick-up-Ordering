const express = require('express');
const router  = express.Router();
const menuQueries = require('../db/queries/menus');
const userQueries = require('../db/queries/users');
const { user } = require('pg/lib/defaults');

router.get('/:id', (req, res) => {

  menuQueries.getMenuItemById(req.params.id)
    .then(menu => {
      userQueries.getUserById(req.session.user_id)
        .then(user => {
          const templateVars = { menu, user };
          res.status(200).render('menuDetail', templateVars);
        })

    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
