const express = require('express');
const router  = express.Router();
// const cookieSession = require("cookie-session");
const bcrypt = require("bcryptjs");
const userQueries = require('../db/queries/users');


router.get("/", (req, res) => {
  const users = req.body;
  const templateVars = {user: users[req.session.user_id]};

  // Check if user is logged in: User_id cookie would be set
  if (templateVars.user) {
    return res.redirect("/menus");
  }
  res.render("urls_registration");
});

// Add data from registration form to users database
router.post("/register", (req, res) => {

  // Empty email or password during registration
  if (!req.body || !req.body.email || !req.body.password || !req.phone_number) {
    return res.status(400).send('Email/password or phone cannot be empty!!');
  }
  // Check if email is already present in database
  getUserByEmail(req.body.email)
    .then(data => {
      if (data) {
        return res.status(400).send('Email already in use, try another one!!');
      }
      // Collect User information into database
      userInfo = {
        username: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        phone_number: req.body.phone_number
      };

      // Add new user to database
      // Authenticate and log them into the page
      userQueries.getNewUser(userInfo)
        .then(user => {

          if (!user) {
            return res.send({ error: "error" });
          }
          // Set the cookie
          req.session.user_id = user.id;

          res.redirect("/menus");
        })
        .catch(err => {
          res.send(err);
        });
    })
    .catch(err => res.send(err));

});

module.exports = router;
