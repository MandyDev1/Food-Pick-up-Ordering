const db = require('../../connection');

const editOrder = (orderId, newStatus, newPickupTime, newCompletedTime) => {
  return db.query(`
    UPDATE orders
    SET status = $2, pickup_time = $3, completed_time = $4
    WHERE id = $1
    RETURNING *;
  `, [orderId, newStatus, newPickupTime, newCompletedTime]);
};

module.exports = { editOrder }


// Owner's Order Routes
// Edit: POST /orders/owner/:id

// Purpose: Edit an order.
// Description: Restaurant owners can edit the status or other details of an order.
