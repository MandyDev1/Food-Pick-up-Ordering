// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieSession = require("cookie-session");

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));
app.use(express.json());

app.use(cookieSession({
  name: "session",
  keys: ["key1", "key2"],
  maxAge: 5 * 10 * 60 * 1000,
}));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const menuApiRoutes = require('./routes/menus-api');
const singleMenuApiRoutes = require('./routes/singleMenu-api');
const usersRoutes = require('./routes/users');
const menusRoutes = require('./routes/menus');
const loginRoutes = require('./routes/login');
const logoutRoutes = require('./routes/logout');
const registerRoutes = require('./routes/registration');
const cartRoutes = require('./routes/cart');
const ordersRoutes = require('./routes/order');
const singleMenuRoutes = require('./routes/singleMenu');
const allUserOrderRoutes = require('./routes/myOrder');

// OWNERS ROUTES
const allRestaurantOrderRoutes = require('./routes/restaurant');


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/api/menus', menuApiRoutes);
app.use('/api/menus/', singleMenuApiRoutes);
app.use('/users', usersRoutes);
app.use('/menus', menusRoutes);
app.use('/login', loginRoutes);
app.use('/logout', logoutRoutes);
app.use('/register', registerRoutes);
app.use('/cart', cartRoutes);
app.use('/order', ordersRoutes);
app.use('/menus', singleMenuRoutes);
app.use('/myOrder', allUserOrderRoutes);

// OWNERS PAGES
app.use('/restaurants/orders', allRestaurantOrderRoutes);

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
