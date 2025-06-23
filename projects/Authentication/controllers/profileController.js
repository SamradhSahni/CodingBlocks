const User = require("../models/User");

exports.showProfile = async (req, res) => {
  

  const user = await User.findById(req.session.userId);
  if (!user) return res.redirect("/login");

  res.render("profile", { username: user.username });
};
