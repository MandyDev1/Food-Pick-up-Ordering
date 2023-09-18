const db = require('../../connection');

const getAllMenuOrders = () => {
  return db.query(`SELECT * FROM menu_orders;`);
};

module.exports = { getAllMenuOrders };


// Owner's Order Routes
// Browse: GET /orders

// Purpose: Browse a list of orders.
// Description: Restaurant owners can view a list of all orders.
