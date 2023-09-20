const express = require('express');
const router  = express.Router();
const { getUserById } = require('../db/queries/users/getUser');
const { getItemById } = require('../db/queries/menu/02_getItemById');

router.post('/add', (req, res) => {
  const menuItemId = req.body.id;
  getItemById(menuItemId)
    .then((item) => {
      const newCartItem = { id: item.id, name: item.name, price: item.price, quantity: 1 };
      if (!req.session.cart) {
        req.session.cart = [];
      }
      req.session.cart.push(newCartItem);
      console.log(req.session.cart);
      res.redirect('/cart');
    });
});

router.get('/', (req, res) => {
  const userId = req.session.userId;

  // User is not logged in
  if (!userId) {
    return res.redirect('/login');
  }

  if (!req.session.cart) {
    req.session.cart = [];
  }

  getUserById(req.session.userId)
    .then((data) => {
      const templateVar = { user: data, cart: req.session.cart };

      res.render('cart', templateVar);
    });
});

router.post('/edit', (req, res) => {
  const menuItemId = Number(req.body.id);
  const menuItemQuantity = Number(req.body.quantity);

  for (const cartItem of req.session.cart) {
    if (cartItem.id === menuItemId) {
      cartItem.quantity = menuItemQuantity;
    }
  }

  res.redirect('/cart');
});

router.post('/delete', (req, res) => {
  const menuItemId = Number(req.body.id);
  let matchingIndex = false;
  req.session.cart.forEach((element, index) => {
    if (element.id === menuItemId) {
      matchingIndex = index;
    }
  });
  req.session.cart.splice(matchingIndex, 1);

  res.redirect('/cart');
});

module.exports = router;

