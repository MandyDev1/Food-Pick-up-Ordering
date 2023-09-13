DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES  users(id) ON DELETE CASCADE,
  restaurant_id INTEGER REFERENCES  restaurants(id) ON DELETE CASCADE,
  status VARCHAR(255) DEFAULT 'Order Sent',
  order_time TIMESTAMP,
  pickup_time TIMESTAMP,
  completed_time TIMESTAMP,
  total_price INTEGER NOT NULL
);
