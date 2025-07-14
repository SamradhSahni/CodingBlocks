const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  title: String,
  date: String,
  completed: Boolean,
});
module.exports = mongoose.model("Task", taskSchema);
