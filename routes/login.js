const express = require('express');
const router = express.Router();
const loginUser = require('../db/queries/login/login');
const path = require('path');

// Route for login submission
router.post('/', (req, res) => {
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
router.get('/', (req, res) => {
  if (req.session.userId) {
    return res.redirect('/');
  }

  res.sendFile(path.join(__dirname, '../views/login.html'));
});

module.exports = router;
