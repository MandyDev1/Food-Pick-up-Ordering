const express = require('express');
const router  = express.Router();
const orderQueries = require('../db/queries/orders');
const userQueries = require('../db/queries/users');


router.get('/:restaurantId', (req, res) => {
  // Check if user is logged in
  // if (!req.session.user_id) {
  //   return res.redirect('/login');
  // }

  orderQueries.getAllNewOrder(req.params.restaurantId)
      .then(data => {
        const templateVars = {
          orders: data
        };

        console.log(templateVars);
        res.render('restaurant', templateVars);
      })
      .catch(err => console.log(err));
});

router.post('/:restaurantId', (req, res) => {
  // Check if user is logged in
  // if (!req.session.user_id) {
  //   return res.redirect('/login');
  // }

  // console.log(req.body);
  const { orderId, orderStatus } = req.body;

  orderQueries.updateOrderStatus(orderId, orderStatus)
      .then(data => {
        const templateVars = {
          orders: data
        };
      res.status(200).send();
      })
      .catch(err => console.log(err));
});

module.exports = router;
