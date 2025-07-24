const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
   genre: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional but useful
}, { timestamps: true });

module.exports = mongoose.model("Book", bookSchema);
