const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');

router.get('/', (req, res) => {
  // Check if user is logged in
  if (!req.session.user_id) {
    return res.redirect('/login');
  }

  res.render('menus');
});

router.post('/', (req, res) => {
  // Check if user is logged in
  if (!req.session.user_id) {
    return res.redirect('/login');
  }

  userQueries.getUserById(req.session.user_id)
      .then(data => {
        const templateVars = {user: data};

        res.render('menus', templateVars);
      })
      .catch(err => res.send(err));
});

module.exports = router;

