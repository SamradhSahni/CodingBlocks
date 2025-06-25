const express = require('express');
const path = require('path');
const app = express();
const PORT = 4444;
const mongoose = require('mongoose');
const Blogs = require('./models/blogs');
const hbs = require('hbs');

hbs.registerPartials(path.join(__dirname,'views','partials'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({ extended: true }));
const blogRoutes = require('./routes/blogroutes');
app.use(blogRoutes);
app.set('view engine','hbs');
const routeHandler = require('./routes/blogroutes');
app.use('/',routeHandler);

mongoose.connect('mongodb://127.0.0.1:27017/myBlogs')
  .then(()=>{
    app.listen(PORT,()=>{
      console.log(`http://localhost:`+PORT);
    });
  }).catch(err=>{
    console.log("did not connect")
  })
