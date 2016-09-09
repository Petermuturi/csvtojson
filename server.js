var express = require('express');
var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var Converter = require("csvtojson").Converter;
var converter = new Converter({});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/upload', function(req, res){

  var form = new formidable.IncomingForm();
  form.multiples = true;
  form.uploadDir = path.join(__dirname, '/csv');
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });
  form.on('end', function() {
    res.end('success');
  });
  form.parse(req);
});

app.get('/chart', function(req, res){
converter.on("end_parsed", function (jsonArray) {
   res.send(jsonArray); //here is your result jsonarray 
});
 
//read from file 
require("fs").createReadStream("./csv/csv.csv").pipe(converter);
});
// create and start server
var server = app.listen(process.env.PORT || 3000, function(){
  console.log('Server listening on port 3000');
});
