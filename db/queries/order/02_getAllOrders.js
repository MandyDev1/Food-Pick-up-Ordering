const db = require('../../connection');

const getAllOrders = () => {
  return db.query(`SELECT * FROM orders;`);
};

module.exports = { getAllOrders };


// Owner's Order Routes
// Browse: GET /orders

// Purpose: Browse a list of orders.
// Description: Restaurant owners can view a list of all orders.
