table 1 users
  id, name, phone
table 2 menus
  id, FK(resto id), name, image url, price, description
table 3 restaurants
  id, name, address, phone, city, province, postal code, country  
table 4 orders
  id, FK(menus id) FK(users id), FK(restaurants id), status, total price, quantity, order time, pickup time
