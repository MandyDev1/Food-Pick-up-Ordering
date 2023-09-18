const db = require('../../connection');

const getOrderDetails = (orderId) => {
  return db.query(`
    SELECT
      orders.id AS order_id,
      orders.status AS order_status,
      orders.order_time AS order_time,
      orders.pickup_time AS pickup_time,
      orders.completed_time AS completed_time,
      orders.total_price AS total_price,
      menu_orders.menu_id AS food_item_id,
      menu_orders.quantity AS food_item_quantity
    FROM orders
    JOIN menu_orders ON orders.id = menu_orders.order_id
    WHERE orders.id = $1;
  `, [orderId]);
};

module.exports = { getOrderDetails };


// Owner's Order Routes
// Read: GET /orders/:id

// Purpose: View detailed information about a specific order.
// Description: Restaurant owners can view detailed information about a particular order.
