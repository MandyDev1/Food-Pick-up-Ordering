* Table 1 - users
  * id, name, phone, email, password, user_type(0: Owner, 1: Client)
* Table 2 - menus
  * id, FK(restaurant_id), name, price, image_url, description
* Table 3 - restaurants
  * id, owner_id, name, address, phone, city, province, postal code, country  
* Table 4 - orders
  * id, FK(user id), FK(restaurants id), status, total, quantity, order_time, pickup_time
* Table 5 - menu_orders
  * id, order_id (FK), menu_id (FK)
* Table 6 - messages
  * id, from, to, message, date
