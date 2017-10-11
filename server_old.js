//Task 5.5

var express = require('express');
var app = express();
var fs = require('fs');
var reqNum = 0; //requests counter
var reqData;

app.listen(3000);

app.use('/:reqAdd', function(req, res, next){ //middleware registry 
  var time = new Date();
  var timeFormatted = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
  reqNum += 1;
  console.log('Request number : ' + reqNum);
  console.log('Request time : ' + timeFormatted);
  console.log('Request address : ' + req.params.reqAdd); 
  console.log('Request type : '+ req.method);
  console.log('-------------------------');
  
  reqData += "\r\n" + reqNum + " request: " + req.params.reqAdd + " | time: " + timeFormatted + " | method: " + req.method + " | ";  
  fs.writeFile('./registry.txt', reqData, function(err) {
    if (err) throw err;
  });    
  next();
});
app.all('/store', function (req, res) {
  res.send('Welcome to our store');
});
app.use(function (req, res, next) {
  res.status(404).send('Sorry, wrong request...')
});