const express = require('express');
const router = express.Router();
const registerUser = require('../db/queries/register/register');

router.post('/register', (req, res) => {
  const user = req.body;

  registerUser(user)
  .then(user => res.json(user))
  .catch(err => res.status(500).json({message: 'An error occurred',
error: err}));
});

module.exports = router;
