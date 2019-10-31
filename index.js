var express = require('express');
var moment = require('moment');
var axios = require('axios');

var app = express();
var port = process.env.PORT || 7000;

app.use(express.json());
app.set('view engine', 'ejs');
app.use('/', express.static('dist'));
app.get('/', function (req, res) {

  var resultData = {};
  // Git Change
  res.render('../deposit.ejs', resultData);


});

app.get('/main', function (req, res) {

  res.send('인증완료');

});

app.listen(port, () => console.log(`Server Listening on Port ${port}`));