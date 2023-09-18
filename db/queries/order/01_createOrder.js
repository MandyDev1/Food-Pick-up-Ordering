const db = require('../../connection');

const createOrder = (userId, restaurantId, total, items) => {
  const orderTime = new Date();
  const pickupTime = null;
  const completedTime = null;
  const status = 'Order Sent';

  return db.query(`
    INSERT INTO orders (user_id, restaurant_id, status, order_time, pickup_time, completed_time, total_price)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `, [userId, restaurantId, status, orderTime, pickupTime, completedTime, total])
  .then((result) => {
    const orderId = result.rows[0].id;

    const menuOrderPromises = items.map((item) => {
      const { menuId, quantity } = item;

      return db.query(`
        INSERT INTO menu_orders (order_id, menu_id, quantity)
        VALUES ($1, $2, $3);
      `, [orderId, menuId, quantity]);
    });

    return Promise.all(menuOrderPromises)
      .then(() => {
        return result.rows[0];
      });
  });
};

module.exports = { createOrder }


// User's Order Routes
// Add: POST /orders/:id

// Purpose: Create an order.
// Description: Logged in users can create a new order.
