const Users = require('../models/user');
const bcrypt = require('bcrypt');

module.exports.getLogin = (req, res) => {
  if (req.session.user) {
    return res.redirect('/profile');
  }

  res.render('login', {
    msg: req.flash('msg')
  });
};

module.exports.postLogin = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    console.log('Login attempt for:', username);

    const user = await Users.findOne({ username });

    if (!user) {
      console.log('User not found');
      req.flash('msg', 'User not found');
      return res.redirect('/login');
    }

    if (!user.password) {
      req.flash('msg', 'Password not set. Please use Google login.');
      return res.redirect('/login');
    }

    const match = await bcrypt.compare(password, user.password);
    console.log('Password match:', match);

    if (!match) {
      req.flash('msg', 'Incorrect password');
      return res.redirect('/login');
    }

    req.session.user = {
      id: user._id,
      username: user.username,
      isAdmin: user.isAdmin
    };

    console.log('Login successful → Redirecting to /profile');
    return res.redirect('/profile');

  } catch (err) {
    next(err);
  }
};
