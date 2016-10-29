var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/project4', function(err, db){
  console.log(err || 'DATABASE: OK');
})

app.use(bodyParser.json());
app.use(logger('dev'));

app.listen(PORT, function(err){
  console.log(err || 'SERVER: OK');
})
