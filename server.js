var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var dotenv = require('dotenv').load({silent: true});
var PORT = process.env.PORT || 3000;

var userRoutes = require('./routes/users.js');

mongoose.connect(process.env.MONGO_URL, function(err, db){
  console.log(err || 'DATABASE: OK');
})

app.set('secret', 'helloworld');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use('/api/users', userRoutes);

app.listen(PORT, function(err){
  console.log(err || 'SERVER: OK');
})
