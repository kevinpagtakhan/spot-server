var mongoose = require('mongoose');

var reservationSchema = mongoose.Schema({
  _by: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  _space: {type: mongoose.Schema.Types.ObjectId, ref: 'Space'},
  date: {
    from: Date,
    to: Date
  },
  confirmed: Boolean,
  description: String
}, {timestamps: true})

var Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
