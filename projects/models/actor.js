const mongoose = require('mongoose');
const{schema}=mongoose;

const actorSchema = new mongoose.Schema({
  name:String,
  actorImageUrl:String,
  age:String
});

module.exports = mongoose.model('Actor', actorSchema );