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
      style: 'mapbox://styles/solutionnine/ciyshagd7000i2rmxw2bavxxe',
      zoom: 15
  });

  map.on('load', function () {
    map.addLayer({
         'id': 'venues',
         'type': 'symbol',
         'source': {
             'type': 'geojson',
             'data': '/venues'
         },
         "layout": {
             "icon-image": "{icon}-15",
             "text-field": "{title}",
             "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
             "text-offset": [0, 0.6],
             "text-anchor": "top"
         }
     })

  })

  // Init Socket
  var socket = io();

  // Listen for 'checkin' ping
  socket.on('checkin', function (coords) {

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

  // Listen for 'venues' ping
  socket.on('venues', function (coords) {

    if(!coords)
    {
      return
    }

    // Create Marker
    map.addLayer({
      "id": Date.now().toString(), // Different ID always
      "type": "symbol",
      "source": {
        "type": "geojson",
        "data": {
          "type": "Feature",
          "geometry": {
              "type": "Point",
              "coordinates": [coords.longitude, coords.latitude]
          },
          "properties": {
              "title": coords.name,
              "icon": "monument"
          }
        }
      },
      "layout": {
        "icon-image": "{icon}-15",
        "text-field": "{title}",
        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-offset": [0, 0.6],
        "text-anchor": "top"
      }
    });
  });

}, false);
