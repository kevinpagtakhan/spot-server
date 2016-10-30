var mongoose = require('mongoose');

var spaceSchema = mongoose.Schema({
  _by: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  address: {
    line_1: String,
    line_2: String,
    city: String,
    state: String,
    zip_code: String
  },
  type: String,
  number: String,
  description: String
}, {timestamps: true})

var Space = mongoose.model('Space', spaceSchema);

module.exports = Space;
