const Users = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.getSignup = (req, res) => {
  res.render('signup', {
    msg: req.flash('msg')
  });
};

module.exports.postSignup = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    let user = await Users.findOne({ username });

    if (user) {
      req.flash('msg', 'User already exists, try another username');
      return res.redirect('/signup');
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await Users.create({
      username,
      password: hashedPassword,
      isAdmin: false
    });

    req.flash('msg', 'Signup Successful');
    return res.redirect('/login');

  } catch (err) {
    next(err);
  }
};
