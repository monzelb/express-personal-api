var mongoose = require('mongoose'),
  Schema = mongoose.Schema;



var PhotoSchema = new Schema({
  location: String,
  image: String,
  contents: String,
});

var Photo = mongoose.model('Photo', PhotoSchema);

module.exports = Photo;