const express = require('express');
const router  = express.Router();
const { getUserById } = require('../db/queries/users/getUser');
const { getFoodsByIds } = require('../db/queries/menu/02_getItemById');

router.get('/', (req, res) => {
  const userId = req.session.userId;

  // User is not logged in
  if (!userId) {
    return res.redirect('/login');
  }

  const cartContentString = req.session.cart || '{}';
  const cartContentObject = JSON.parse(cartContentString);
  const gatheredIds = Object.keys(cartContentObject);

  if (gatheredIds.length === 0) {
    return getUserById(userId)
      .then((user) => {
        res.render('cart', { user, cart: []});
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  }

  getFoodsByIds(gatheredIds)
    .then((foods) => {
      const cart = [];

      for (const food of foods) {
        const id = food.id;
        const name = food.name;
        const price = food.price;
        const qty = cartContentObj[id];

        const eachFood = { id, name, price, qantity };
        cart.push(eachFood);
      }

      return getUserById(userId)
        .then((user) => {
          res.render("cart", { user, cart });
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;

