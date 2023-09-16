const db = require('../../connection');

const getOrderById = (orderId) => {
  return db.query(`SELECT * FROM orders WHERE id = $1;`, [orderId]);
};

module.exports = { getOrderById };


// Owner's Order Routes
// Read: GET /orders/:id

// Purpose: View detailed information about a specific order.
// Description: Restaurant owners can view detailed information about a particular order.
