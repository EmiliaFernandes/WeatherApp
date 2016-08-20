var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var weatherSchema   = new Schema({
  temp    : String,
  pressure:  String,
  humidity:  String,
  temp_min:  String,
  temp_max:  String
});

module.exports = mongoose.model('weatherdata', weatherSchema);
