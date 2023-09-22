const express = require('express');
const router  = express.Router();
const { sendSMS } = require('../twilio');
const userQueries = require('../db/queries/users');
const orderQueries = require('../db/queries/orders');

// let cartData = null;

router.post('/', (req, res) => {
  if (!req.session.user_id) {
    return res.redirect('/login');
  }

  // console.log(req.body)

  cartData = req.body;
  const { menus, total, restaurantId } = cartData.data;

  userQueries.getUserById(req.session.user_id)
  .then(userData => {
    let orderId;

    // Add Order to database
    orderQueries.addOrderItem(req.session.user_id, cartData.data)
    .then(orderData => {
      orderId = orderData[0].id;

      for (const menu of menus) {
        orderQueries.addOrderMenuItem(orderId, menu)
        .then(data => {
          console.log('Added to database!!')
        })
        .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));


    res.status(200).redirect('/order');
  })
  .catch(err => console.log(err));


});

router.get('/', (req, res) => {
  if (!req.session.user_id) {
    return res.redirect('/login');
  }

  // Send message to restaurant
  sendSMS('+17804991082', 'An order has been placed to your restaurant');

  userQueries.getUserById(req.session.user_id)
  .then(userData => {

    orderQueries.getUsersLastOrder(req.session.user_id)
    .then(orderData => {

      const templateVars = {
        user: userData,
        order: orderData
      };

      return res.render('ordered', templateVars);
    })
    .catch(err => console.log(err));

  })
  .catch(err => res.send(err));

});


module.exports = router;
