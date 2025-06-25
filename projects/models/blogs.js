const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: String,
  description: String,
  actor: { type: Schema.Types.ObjectId, ref: 'Actor' }
});

module.exports = mongoose.model('Blog', blogSchema);
