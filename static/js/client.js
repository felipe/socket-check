const latlonSanJuan = [-66.10574245766819,18.466280845887553]; // San Juan, PR

var map;
var user;

// Create interaction PopUp
var createIOPopup = function (lng, lat) {
  new mapboxgl.Popup({closeOnClick: true})
      .setLngLat([lng, lat])
      .setHTML('<form action="/venue" onsubmit="returnfalse" method="post">\
        <input type="hidden" name="longitude" value="'+lng+'" />\
        <input type="hidden" name="latitude" value="'+lat+'" />\
        <input type="text" name="name" value="" placeholder="Location Name" required="true" />\
        <input type="hidden" name="username" value="'+user+'" required="true" />\
        <input type="submit" value="Create Location!" />\
        </form>')
      .addTo(map);
}

// Create position overlay
var setCurrentPosition = function (lng, lat) {

  if(!user){
    return
  }

  new mapboxgl.Popup({closeOnClick: true})
      .setLngLat([lng, lat])
      .setHTML('<form action="/check-in" onsubmit="returnfalse" method="post">\
        <input type="hidden" name="longitude" value="'+lng+'" />\
        <input type="hidden" name="latitude" value="'+lat+'" />\
        <input type="hidden" name="username" value="'+user+'" placeholder="Username" required="true" />\
        <input type="submit" value="Check in!" />\
        </form>')
      .addTo(map);

}

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

  // 'click' event listner
  map.on('click', function (e) {

    // Get user value
    user = document.getElementById("user").value;

    if(user) {

      // Show Overlay
      //setCurrentPosition(e.lngLat.lng,e.lngLat.lat);
      createIOPopup(e.lngLat.lng,e.lngLat.lat)

    }

  });

}, false);
