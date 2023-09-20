const express = require('express');
const router  = express.Router();
const bcrypt = require("bcryptjs");
const userQueries = require('../db/queries/users');

router.get('/', (req, res) => {
  const users = req.body;

  const templateVars = {user: users[req.session.user_id]};
  const loginError = {message: ''};

  // Check if user is logged in: User_id cookie would be set
  if (templateVars.user) {
    return res.redirect("/menus");
  }
  // res.render("login", templateVars);
  res.render("login", loginError);
});

// Endpoint for user login
router.post("/", (req, res) => {
  // Extract the user info
  userQueries.getUserByEmail(req.body.email)
    .then(data => {
      // Check if the email in the login form is present in the database
      if (!data) {
        return res.status(403).send();
      }

      // If email is found
      if (data) {

        // Check if the password provided matches the one stored in database
        if (bcrypt.compareSync(req.body.password, data.password)) {
          req.session.user_id = data.id;
          console.log(`User ${data.name} has been successfully authenticated`);
          return res.redirect("/menus");
        }

        const loginError = {message: 'Email or password is incorrect!!!'};
        res.status(400).send(req.session.user_id).render('login', loginError);
      }
    })
    .catch(err => {
      res.send(err);
    });



});


module.exports = router;
