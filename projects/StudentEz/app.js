require("dotenv").config();
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const path = require("path");
const hbs = require("hbs");
const passport = require("passport");
require("./passport");

const User = require("./models/User");

const app = express();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(path.join(__dirname, "views/partials"));

hbs.registerHelper("eq", function (a, b) {
  return a === b;
});

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultsecret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

app.use(async (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  } else if (req.session.userId) {
    try {
      const dbUser = await User.findById(req.session.userId);
      res.locals.user = dbUser;
    } catch (err) {
      res.locals.user = null;
    }
  } else {
    res.locals.user = null;
  }
  next();
});

app.use((req, res, next) => {
  const openRoutes = [
    "/login",
    "/signup",
    "/auth/google",
    "/auth/google/callback"
  ];
  if (!req.session.userId && !req.isAuthenticated() && !openRoutes.includes(req.path)) {
    return res.redirect("/login");
  }
  next();
});

app.use("/signup", require("./routes/signup"));
app.use("/login", require("./routes/login"));
app.use("/home", require("./routes/home"));
app.use("/subjects", require("./routes/subjects"));
app.use("/attendance", require("./routes/attendance"));
app.use("/exams", require("./routes/exams"));
app.use("/budget", require("./routes/budget")); // ← your updated budget feature
app.use("/planner", require("./routes/planner"));
app.use("/auth", require("./routes/googleAuth"));
app.use("/workshops", require("./routes/workshop"));

app.get("/", (req, res) => {
  res.redirect("/login");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Logout error:", err);
      return res.redirect("/home");
    }
    res.redirect("/login");
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
