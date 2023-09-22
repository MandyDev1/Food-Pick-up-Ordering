const db = require('../connection');

const addOrderItem = (userId, menuInfo) => {
  const orderTime = new Date();
  return db.query('INSERT INTO orders (user_id, restaurant_id, order_time, total_price) VALUES($1, $2, $3, $4) RETURNING *;',
      [userId, menuInfo.restaurantId, orderTime, Math.ceil(menuInfo.total * 100)])
    .then(data => {
          return data.rows;
        });
};

const addOrderMenuItem = (orderId, menu) => {
  return db.query('INSERT INTO menu_orders (order_id, menu_id, quantity) VALUES($1, $2, $3) RETURNING *;',
      [orderId, menu.id, menu.quantity])
    .then(data => {
        return data.rows;
    });
};

const getUsersLastOrder = (userid) => {
  return db.query('SELECT * FROM orders WHERE user_id = $1 ORDER BY order_time DESC LIMIT 1;', [userid])
    .then(data => {
      return data.rows[0];
    });
};

const getAllUserOrder = (userid) => {
  return db.query('SELECT * FROM orders WHERE user_id = $1 ORDER BY order_time DESC;', [userid])
    .then(data => {
      return data.rows;
    });
};

const getAllNewOrder = (restaurantId) => {
  return db.query("SELECT * FROM orders WHERE restaurant_id = $1 AND status != 'Order Completed';", [restaurantId])
    .then(data => {
      return data.rows;
    });
};

const updateOrderStatus = (orderId, orderStatus) => {
  if (orderStatus !== 'Order Completed') {
    return db.query("UPDATE orders SET status = $2 WHERE id = $1 RETURNING *;", [Number(orderId), orderStatus])
      .then(data => {
        return data.rows[0];
      });
  }
  return db.query("UPDATE orders SET status = $2, pickup_time = $3, completed_time = $4 WHERE id = $1 RETURNING *;",
      [Number(orderId), orderStatus, new Date(), new Date()])
      .then(data => {
        return data.rows[0];
      });
};


module.exports = { addOrderItem, addOrderMenuItem, getUsersLastOrder, getAllUserOrder, getAllNewOrder, updateOrderStatus };
