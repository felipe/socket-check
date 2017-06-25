var express = require('express');
var io = require('socket.io');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');

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

  // Create the 'checkin' ping for the listeners
  io.sockets.emit('checkin', req.body);

  res.redirect('check-in');

});


mongodb.MongoClient.connect("mongodb://localhost:27017/miwiken", function(err, db) {
  if (err) {
    throw err
  }

  app.get('/venues', function (req, res){

    db.collection('venues').find({
      "geometry": {
        $geoWithin: { $box: [[-66.1280843306001, 18.474557059013236],[-66.09573474375455, 18.45904825588876]]}
      }
    }).limit(100).toArray(function(err, venues) {

        res.send({"type":"FeatureCollection","features": venues});

      })
  })

  app.post('/venue', function(req, res) {

    // Create a new venue
    db.collection('venues').insert(createVenueDoc(req.body.name,req.body.longitude,req.body.latitude));

    // Send the 'venues' ping for the listeners
    io.sockets.emit('venues', req.body)

    res.redirect('check-in');

  });
});

// Helpers
var createVenueDoc = function (name, lng, lat) {
    return {
        name : name,
        geometry : {
            type : "Point",
            coordinates : [Number(lng), Number(lat)]
        },
        properties: {
          title: name,
          description: '',
          icon: 'monument'
        }
    }
}
