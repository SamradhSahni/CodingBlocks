const express = require('express');
const router = express.Router();
const passport = require('../auth/passport'); // your custom config
const loginController = require('../controllers/login');

// Show login form
router.get('/', loginController.getLogin);

// Local login
router.post('/',
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true // to show message
  }),
  (req, res) => {
    // Local login success
    req.session.user = {
      id: req.user._id,
      username: req.user.username,
      isAdmin: req.user.isAdmin
    };
    res.redirect('/profile');
  }
);

// Google login
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    failureFlash: true
  }),
  (req, res) => {
    // Google login success
    req.session.user = {
      id: req.user._id,
      username: req.user.username,
      isAdmin: req.user.isAdmin
    };
    res.redirect('/profile');
  });

module.exports = router;
