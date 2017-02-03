const latlonSanJuan = [-66.10574245766819,18.466280845887553]; // San Juan, PR

var map;

// Check for document load
document.addEventListener('DOMContentLoaded', function() {

  // Set Access Token
  mapboxgl.accessToken = mbak;

  // Init Map
  map = new mapboxgl.Map({
      container: 'map',
      center: latlonSanJuan,
      style: 'mapbox://styles/mapbox/streets-v10',
      zoom: 15
  });

  // Init Socket
  var socket = io.connect('http://localhost:3000');

  // Listen for 'ping'
  socket.on('ping', function (coords) {

    if(!coords)
    {
      return
    }

    // Create Popup
    new mapboxgl.Popup({closeOnClick: true})
    .setLngLat([coords.longitude, coords.latitude])
    .setHTML('<h1>'+coords.username+'</h1>')
    .addTo(map);

  });

}, false);
