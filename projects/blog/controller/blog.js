const Blogs = require('../models/blogs'); 
const Actors = require('../models/actor'); 

module.exports.getBlogs = async (req, res) => {
  let blogs = await Blogs.find().populate('actor');
  let actors = await Actors.find();
  console.log(blogs);
  res.render('blogs', { blogs,actors });
};

module.exports.postBlogs = async (req, res) => {
  const { title, description, actor } = req.body;
  await Blogs.create({ title, description, actor });
  res.redirect('/blogs');
};
module.exports.getDelete = async (req, res) => {
  const { id} = req.query;
  await Blogs.deleteOne({ _id:id});
  res.redirect('/blogs');
};
module.exports.getDeleteActor = async (req, res) => {
  const { id} = req.query;
  await Actors.deleteOne({ _id:id});
  res.redirect('/actors');
};
module.exports.getUpdate = async (req, res) => {
  const { id} = req.query;
  let blog = await Blogs.find({_id:id}).populate('actor');
  res.render('updateblog',{blog:blog[0]});
};
module.exports.postUpdate = async (req, res) => {
    const {title, description,actor,id} = req.body;
    let blog = await Blogs.findOne({_id:id});
    blog.title = title;
    blog.description = description;
    blog.actor = actor;
    await blog.save();

    res.redirect('/blogs');
};
module.exports.getDetails = async (req, res) => {
    const {id} = req.query;
    let blog = await Blogs.findOne({_id:id}).populate('actor');
    res.render('blog-details',{blog})
};
module.exports.getActors = async (req, res) => {
    let actors = await Actors.find({});
    res.render('actors',{actors});
};
module.exports.postActors = async (req, res) => {
    
    const{actorImageUrl,name,age}=req.body;
    await Actors.create({actorImageUrl,name,age})
    res.redirect('/actors');
    console.log(req.body);
};
module.exports.getUpdateActor = async (req, res) => {
    const {id}=req.query;
    let actor = await Actors.findOne({_id:id});
    res.render('updateactor',{actor})
};
module.exports.postUpdateActor = async (req, res) => {
    const {actorImageUrl,name,age,id}=req.body;
    let actor = await Actors.findOne({_id:id});
    actor.name = name;
    actor.actorImageUrl= actorImageUrl;
    actor.age = age;
    await actor.save();
    res.redirect('/actors')
};
