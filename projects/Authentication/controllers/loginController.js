const User = require("../models/User");

exports.showLogin = (req, res) => {
  res.render("login");
};

exports.handleLogin = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.send("User not found");
  }

  if (user.password !== password) {
    return res.send("Invalid password");
  }

  req.session.userId = user._id;
  res.redirect("/profile");
};
