### User Routes

D- Browse: GET /menus  
  - Purpose: Retrieve a list of menus.
  - Description: Unregistered users can view the restaurant's menu to select dishes.

D- Read: GET /menus/:id  
  - Purpose: View detailed information about a specific menu item.
  - Description: Unregistered users can view detailed information about a particular menu item.

### Owner Routes

### Owner's menu page route
-Browse: GET /menus/owner

D- Edit: POST /menus/owner/:id/edit  
  - Purpose: Edit a menu item.
  - Description: Restaurant owners can edit the information of a specific menu item.

D- Add: POST /menus  
  - Purpose: Add a new menu item.
  - Description: Restaurant owners can add new dishes to the menu.

D- Delete: POST /menus/:id/delete  
  - Purpose: Delete a menu item.
  - Description: Restaurant owners can remove a specific menu item.

### User's Order Routes

- Add: POST /orders/:id  
  - Purpose: Create an order.
  - Description: Logged in users can create a new order.

### Owner's Order Routes

- Browse: GET /orders  
  - Purpose: Browse a list of orders.
  - Description: Restaurant owners can view a list of all orders.

- Read: GET /orders/:id  
  - Purpose: View detailed information about a specific order.
  - Description: Restaurant owners can view detailed information about a particular order.

- Edit: POST /orders/owner/:id  
  - Purpose: Edit an order.
  - Description: Restaurant owners can edit the status or other details of an order.

### Registration Routes

D- ADD (CREATE): POST /register  
  - Purpose: Create a new user account.
  - Description: Unregistered users can register a new account.

D- GET /register  
  - Purpose: Display the user registration page.
  - Description: Redirects to the menu (home) page if the user is already logged in.

### Login Routes
D- ADD (CREATE): POST /login  
  - Purpose: User login.
  - Description: Registered users can log in to their accounts.

D- GET /login  
  - Purpose: Display the login page.
  - Description: Redirects to the menu (home) page if the user is already logged in.

### Logout Route
- GET /logout
 - Redirect to main page.

### Cart
User’s cart view
- Users can go to the cart page to see all the foods(from the menu) he just added to the cart: 
the food’s name, 
quantity for each food,
price for each food,
total foods count in the cart,
Total price for all foods in the cart.
- From there he can edit the quantity of one particular food, or delete any food if he doesn’t want to order anymore. 

