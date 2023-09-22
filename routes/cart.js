const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');
const orderQueries = require('../db/queries/orders');

router.get('/', (req, res) => {
  // Check if user is logged in
  if (!req.session.user_id) {
    return res.redirect('/login');
  }

  // menu: JSON.parse(localStorage.getItem('menus'))
  userQueries.getUserById(req.session.user_id)
      .then(data => {
        const templateVars = {
          user: data
        };
        // console.log(localStorage)

        res.render('cart', templateVars);
      })
      .catch(err => res.send(err));
});


module.exports = router;

