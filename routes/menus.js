const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');

router.get('/', (req, res) => {

  // if (req.session.user_id) {
    userQueries.getUserById(req.session.user_id)
      .then(data => {
        const templateVars = {user: data};
        // console.log(templateVars);

        // res.render('menus', templateVars);
        res.render('menus', templateVars);
      })
      .catch(err => res.send(err));
  // }
});

module.exports = router;

