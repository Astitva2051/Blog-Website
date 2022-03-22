const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
const date = require('date-and-time');
mongoose.plugin(slug);

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: "General",
  },
  createdAt: {
    type: String,
    default: date.format(new Date(), 'DD/MM/YYYY HH:mm:ss'),
  },
  slug: {
    type: String,
    unique: true,
    slug: ["title", "author"],
    unique: true,
  },
});

module.exports = mongoose.model("article", articleSchema);
