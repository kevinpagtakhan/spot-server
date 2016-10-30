var User = require('../models/User.js');
var Space = require('../models/Space.js');
var Reservation = require('../models/Reservation.js');

var controller = {
  index: function(req, res){
    Reservation.find({}, function(err, spaces){
      if (err) {
        res.json({success: false, message: err})
      } else {
        res.json({success: true, data: spaces})
      }
    });
  },

  create: function(req, res){
    User.findById(req.user._id, function(err, user){
      if(err){
        res.json({success: false, message: 'Could not find user'});
      } else {
        Space.findById(req.body.space_id, function(err, space){
          if(err){
            res.json({success: false, message: 'Could not find user'});
          } else {
            var reservation = new Reservation();
            reservation._by = req.user._id;
            reservation._space = req.body.space_id;
            reservation.date.from = req.body.date.from;
            reservation.date.to = req.body.date.to;
            reservation.confirmed = false;
            reservation.description = req.body.description;

            reservation.save(function(err, createdReservation){
              if(err) {
                res.json({success: false, message: 'Could not create reservation'});
              } else {
                console.log(user);
                user.reservations.push(createdReservation);
                user.save(function(err){
                  if(err) {
                    res.json({success: false, message: 'Could not update user'});
                  } else {
                    space.reservations.push(createdReservation);
                    space.save(function(err){
                      if(err) {
                        res.json({success: false, message: 'Could not update space'});
                      } else {
                        res.json({success: true, data: createdReservation});
                      }
                    })
                  }
                });
              }
            })
          }
        })
      }
    });
  },

  show: function(req, res){
    Reservation.findById(req.params.id, function(err, space){
      if (err) {
        res.json({success: false, message: err})
      } else {
        res.json({success: true, data: space})
      }
    });
  },

  update: function(req, res){
    Reservation.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, space){
      if (err) {
        res.json({success: false, message: err})
      } else {
        res.json({success: true, data: space})
      }
    });
  },

  delete: function(req, res){
    Reservation.findByIdAndRemove(req.params.id, function(err, space){
      if (err) {
        res.json({success: false, message: err})
      } else {
        res.json({success: true, data: space})
      }
    });
  },
}

module.exports = controller;
