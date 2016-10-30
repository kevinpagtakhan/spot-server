var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var dotenv = require('dotenv').load({silent: true});
var jwt = require('jsonwebtoken');
var PORT = process.env.PORT || 3000;

var userRoutes = require('./routes/users.js');
var spacesRoutes = require('./routes/spaces.js');

mongoose.connect(process.env.MONGO_URL, function(err, db){
  console.log(err || 'DATABASE: OK');
})

app.set('secret', 'helloworld');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use('/api/users', userRoutes);

app.use(function(req, res, next){
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if(token) {
    jwt.verify(token, 'helloworld', function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Token authentication failed.' });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.json({success: false, message: 'No token provided'});
  }
})

app.use('/api/spaces', spacesRoutes);

app.get('/', function(req, res){
  console.log(req.user);
  res.json({success: true, message: 'OK'})
});

app.listen(PORT, function(err){
  console.log(err || 'SERVER: OK');
})
