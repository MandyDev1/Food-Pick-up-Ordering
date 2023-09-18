const express = require('express');
const router = express.Router();
const { createOrder } = require('../db/queries/order/01_createOrder');
const { getAllMenuOrders } = require('../db/queries/order/02_getAllMenuOrders');
const { getOrderDetails } = require('../db/queries/order/03_getOrderDetails');
const { editOrder } = require('../db/queries/order/04_editOrder');

// Route to create an order
router.get('/orders/:id', (req, res) => {
  const userId = req.session.userId;
  const restaurantId = req.params.id;
  const { total, items } = req.body;

  // Call the createOrder function to create a new order
  createOrder(userId, restaurantId, total, items)
    .then((newOrder) => {
      res.json({ message: 'Order created successfully', order: newOrder });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`Internal server error: ${err.message}`);
    });
});

// Route for owner to browse a list of orders
router.get('/orders', (req, res) => {
  // Call the getAllMenuOrders function to retrieve all menu orders
  getAllMenuOrders()
    .then((orders) => {
      res.render('ownerOrders', { orders });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`Internal server error: ${err.message}`);
    });
});

// Route for owner to view details about a particular order
router.get('/orders/:id', (req, res) => {
  const orderId = req.params.id;

  // Call the getOrderDetails function to retrieve details about the order
  getOrderDetails(orderId)
    .then((orderDetails) => {
      res.render('ownerOrderDetails', { orderDetails });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`Internal server error: ${err.message}`);
    });
});

// Route for owner to edit the status of an order
router.post('/orders/owner/:id', (req, res) => {
  const orderId = req.params.id;
  const { newStatus, newPickupTime, newCompletedTime } = req.body;

  // Call the editOrder function to edit the order
  editOrder(orderId, newStatus, newPickupTime, newCompletedTime)
    .then((updatedOrder) => {
      res.json({ message: 'Order status edited successfully', order: updatedOrder });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`Internal server error: ${err.message}`);
    });
});
