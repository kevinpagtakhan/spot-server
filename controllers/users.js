var User = require('../models/User.js');
var jwt = require('jsonwebtoken');

var controller = {
  index: function(req, res){
    User.find({}, function(err, users){
      if (err) {
        res.json({success: false, message: err})
      } else {
        res.json({success: true, data: users})
      }
    })
  },

  register: function(req, res){
    User.findOne({username: req.body.username}, function(err, user){
      if(err) {
        req.json({success: false, message: err});
      } else if (user) {
        res.json({success: false, message: 'Username already taken. Please choose a new one.'});
      } else {
        var newUser = new User();
        newUser = req.body;
        newUser.password = User.generateHash(req.body.password);

        newUser.save(function(err, createdUser){
          res.json({success: true, data: createdUser});
        })
      }
    })
  },

  authenticate: function(req, res){
    User.findOne({username: req.body.username}, function(err, user){
      if(err) {
        req.json(err);
      } else if (!user) {
        res.json({success: false, message: 'Authentication failed. User not found.'});
      } else {
        if(!User.validatePassword(req.body.password)){
          res.json({success: false, message: 'Authentication failed. Incorrect password.'})
        } else {
          var userToken = {
            id: user._id,
            username: user.username
          };
          var secret = 'helloworld';
          var config = {
            expiresInMinutes: 1440
          }

          var token = jws.sign(userToken, secret, config);

          res.json({success: true, data: token});
        }
      }
    })
  },

  show: function(req, res){
    User.findById(req.params.id, function(err, user){
      if (err) {
        res.json({success: false, message: err})
      } else{
        res.json({success: true, data: user});
      }
    })
  },

  update: function(req, res){
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, user){
      if (err) {
        res.json({success: false, message: err})
      } else{
        res.json({success: true, data: user});
      }
    })
  },

  delete: function(req, res){
    User.findByIdAndRemove(req.params.id, function(err, user){
      if (err) {
        res.json({success: false, message: err})
      } else{
        res.json({success: true, data: user});
      }
    })
  }
}

module.exports = controller;
