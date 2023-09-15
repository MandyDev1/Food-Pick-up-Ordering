const express = require('express');
const router = express.Router();
const registerUser = require('../db/queries/register/register');

// Route for register submission
router.post('/register', (req, res) => {
  const user = req.body;

  registerUser(user)
  .then(user => res.json(user))
  .catch(err => res.status(500).json({message: 'An error occurred',
error: err}));
});

// Route to go to register page
router.get('/register', (req, res) => {
  if (req.session.userId) {
    return res.redirect('/');
  }

  res.render('register');
});

module.exports = router;
