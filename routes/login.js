const express = require('express');
const router = express.Router();
const loginUser = require('../db/queries/login/login');

// Route for login submission
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  loginUser(email, password)
  .then(user => {
    req.session.userId = user.id;
    res.redirect('/');
  })
  .catch(err => {
    res.status(401).json({ message: 'Invalid email or password', error: err });
  });
});

// Route to go to login page
router.get('/login', (req, res) => {
  if (req.session.userId) {
    return res.redirect('/');
  }

  res.render('login');
});

module.exports = router;
