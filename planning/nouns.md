* Table 1 - users
  * id, name, phone
* Table 2 - menus
  * id, FK(resto id), name, price, description
* Table 3 - restaurants
  * id, name, address, phone, city, province, postal code, country  
* Table 4 - orders
  * id,sta FK(users id), FK(restaurants id), status, total price, quantity, order time, pickup time
* Table 5 - menu_orders
  * id, order_id (FK), menu_id (FK)
