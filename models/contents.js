var mongoose = require('mongoose'),
  Schema = mongoose.Schema;



var ContentsSchema = new Schema({
  name: String
});

var Contents = mongoose.model('Contents', ContentsSchema);

module.exports = Contents;