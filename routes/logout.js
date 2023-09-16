const express = require('express');
const router  = express.Router();

/**
 * LOGOUT BUTTON
 * Use only when the user id is present on page
 * Endpoint for user logout
*/
router.get("/", (req, res) => {

  // Clear the cookie
  req.session = null;

  res.redirect("/menus");
});

module.exports = router;
