const latlonSanJuan = [-66.10574245766819,18.466280845887553]; // San Juan, PR

var map;
var user;

// Create position overlay
function setCurrentPosition(longitude, latitude) {

  if(!user){
    return
  }

  var popup = new mapboxgl.Popup({closeOnClick: true})
      .setLngLat([longitude, latitude])
      .setHTML('<form action="/check-in" onsubmit="returnfalse" method="post">\
        <input type="hidden" name="longitude" value="'+longitude+'" />\
        <input type="hidden" name="latitude" value="'+latitude+'" />\
        <input type="hidden" name="username" value="'+user+'" placeholder="Username" required="true" />\
        <input type="submit" value="Check in!" />\
        </form>')
      .addTo(map);

}

// Check for document load
document.addEventListener('DOMContentLoaded', function() {

  // Set Access Token
  mapboxgl.accessToken = '';

  // Init Map
  map = new mapboxgl.Map({
      container: 'map',
      center: latlonSanJuan,
      style: 'mapbox://styles/mapbox/streets-v10',
      zoom: 15
  });

  // 'click' event listner
  map.on('click', function (e) {

    // Get user value
    user = document.getElementById("user").value;

    if(user) {

      // Show Overlay
      setCurrentPosition(e.lngLat.lng,e.lngLat.lat);

    }

  });

}, false);
