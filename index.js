var express = require('express');
var moment = require('moment');

var app = express();
var port = process.env.PORT || 7500;

app.use(express.json());
app.set('view engine', 'ejs');
app.get('/', function (req, res) {

  // res.render('../min1.ejs', resultData);
  res.send('test');

});


app.listen(port, () => console.log(`Server Listening on Port ${port}`));