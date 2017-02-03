var express = require('express');
var io = require('socket.io');
var bodyParser = require('body-parser');

var app = express();
var server = require('http').Server(app);

require('dotenv').config();
var mapboxApiKey = process.env.MAPBOX_APIKEY;
var port = process.env.PORT || 3000;

io = io(server);

// Init server
server.listen(port, function () {
  console.log('Server listening at port %d', port);
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

  res.render('index', {mbak: mapboxApiKey})

})

app.get('/check-in', function (req, res) {

  res.render('check-in', {mbak: mapboxApiKey})

})

app.post('/check-in', function(req, res) {

  // Create the 'ping' for the listeners
  io.sockets.emit('ping', req.body);

  res.redirect('check-in');

});
