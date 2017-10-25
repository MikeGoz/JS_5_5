//Task 5.5 - modified

var express = require('express');
var app = express();
var fs = require('fs');
var reqNum = 0; //requests counter
var reqData ='Requests registry : ';
var timeFormatted;

var registry = function (req, res, next) {
  var time = new Date();
  timeFormatted = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
  reqNum += 1;
  console.log('Request number : ' + reqNum);
  console.log('Request time : ' + timeFormatted);
  console.log('Request address : ' + req.params.reqAdd); 
  console.log('Request type : '+ req.method);
  console.log('-------------------------');
  next()
};
var registryToFile = function (req, res, next) {
  reqData += "\r\n" + reqNum + " request: " + req.params.reqAdd + " | time: " + timeFormatted + " | method: " + req.method + " | ";  
  fs.writeFile('./registry.txt', reqData, function(err) {
    if (err) throw err;
  });    
  next()
};
app.use("/:reqAdd", registry, registryToFile); 
app.all('/store', function (req, res) {
  res.send('Welcome to our store');
});
app.use(function (req, res, next) {
  res.status(404).send('Sorry, wrong request...')
});
app.listen(3000);