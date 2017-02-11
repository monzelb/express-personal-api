var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ContentsSchema = new Schema({
  name: String
});

var PhotoSchema = new Schema({
  location: String,
  contents: String,
  image: String
});

var Photo = mongoose.model('Photo', PhotoSchema);

module.exports = Photo;