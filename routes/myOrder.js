const express = require('express');
const router  = express.Router();
const orderQueries = require('../db/queries/orders');
const userQueries = require('../db/queries/users');


router.get('/', (req, res) => {
  if (!req.session.user_id) {
    return res.redirect('/login');
  }


  userQueries.getUserById(req.session.user_id)
  .then(userData => {

    orderQueries.getAllUserOrder(req.session.user_id)
    .then(data => {

      const templateVars = {
        orders: data,
        user: userData
      };

      res.status(200).render('myOrder', templateVars);
    })
    .catch(err => console.log(err));
  })
  .catch(err => console.log(err));



});


module.exports = router;
