var express = require('express');
var io = require('socket.io');
var bodyParser = require('body-parser');

var app = express();
var server = require('http').Server(app);

io = io(server);

server.listen(3000, function() {

  console.log('Listening on port 3000');

});

/*
  Set Routes
*/

app.use('/js', express.static('static/js'))
app.use('/css', express.static('static/css'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({

  extended: true

}));

app.set('view engine', 'pug')

app.get('/', function (req, res) {

  res.render('index')

})

app.get('/check-in', function (req, res) {

  res.render('check-in')

})

app.post('/check-in', function(req, res) {

  // Create the 'ping' for the listeners
  io.sockets.emit('ping', req.body);

  res.redirect('check-in');

});
