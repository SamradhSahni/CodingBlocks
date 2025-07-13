require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const hbs = require('hbs');
const passport = require('./auth/passport'); // ✅ passport config file

// 🔧 View engine setup
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));
app.set('view engine', 'hbs');

// 📁 Static files & form parsing
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 🗝️ Session setup
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.DB_PATH }),
  cookie: { secure: false } // true only for HTTPS
}));

// 🔐 Passport setup
app.use(passport.initialize());
app.use(passport.session());

// 🔔 Flash setup
app.use(flash());

// 🔄 Flash middleware for templates
app.use((req, res, next) => {
  res.locals.msg = req.flash('msg');
  res.locals.error = req.flash('error'); // passport default
  next();
});

// ✅ Middleware imports
const { isAdmin } = require('./middlewares/admin');
const { isLoggedIn } = require('./middlewares/isLoggedIn');

// 🌐 Routes
app.get('/', (req, res) => res.redirect('/login'));

app.use('/signup', require('./routes/signup'));
app.use('/login', require('./routes/login'));

app.use('/logout', (req, res) => {
  req.logout(() => {
    req.session.destroy(() => {
      res.redirect('/login');
    });
  });
});

// 🚫 DO NOT protect login/signup with isLoggedIn!
app.use('/profile', isLoggedIn, require('./routes/profile'));
app.use('/admin', isAdmin, require('./routes/admin'));
app.use('/shop', require('./routes/shop'));

// 🌍 MongoDB Connection
mongoose.connect(process.env.DB_PATH, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(process.env.PORT || 1001, () => {
    console.log('🚀 Server running at http://localhost:' + (process.env.PORT || 1001));
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});
