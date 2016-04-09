// initialise soundcloud API
SC.initialize({
  client_id: '790956356ed17e41bfaa38f216122674' // zenpho
});

// is a number between a minimum and maximum?
Number.prototype.between = function (min, max) {
    return this > min && this < max;
};

var g_locations = {
	1 : {
		latitude : 51.48,
		longitude : -2.51,
		radius : 0.01,
		track : 293 		// soundcloud track id
	},
	2 : {
	}
};

var g_mapObj;

// //////

// This example requires the Geometry library. Include the libraries=geometry
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=geometry">

function initGoogleMap() {
	
	g_mapObj = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: 0, lng: 0},
	  zoom: 5,
	});
	
	var triangleCoords = [
	  {lat: 25.774, lng: -80.19},
	  {lat: 18.466, lng: -66.118},
	  {lat: 32.321, lng: -64.757}
	];

	var bermudaTriangle = new google.maps.Polygon({paths: triangleCoords});

	google.maps.event.addListener(map, 'click', function(e) {
	  var resultColor =
		  google.maps.geometry.poly.containsLocation(e.latLng, bermudaTriangle) ?
		  'red' :
		  'green';

	  new google.maps.Marker({
		position: e.latLng,
		map: g_mapObj,
		icon: {
		  path: google.maps.SymbolPath.CIRCLE,
		  fillColor: resultColor,
		  fillOpacity: .2,
		  strokeColor: 'white',
		  strokeWeight: .5,
		  scale: 10
		}
	  });
	});
}

// //////

function doStartup() {
	initGoogleMap();
	getLocation();
}

// //////

function playSoundForLocation(location) {
	for (obj in g_locations) {
		var radius = obj.radius;
		var lat = obj.latitude;
		var lon = obj.longitude;
		var track = obj.track;
		
		if ( location.coords.latitude.between(lat - radius, lat + radius) &&
			 location.coords.latitude.between(lon - radius, lon + radius) )
		{
			SC.stream('/tracks/' + track).then(function(player){
			  player.play();
			});
		}
	}
}

function getLocation() {
	var output = document.getElementById("output");
    
    output.innerHTML = "Waiting for location...<br>" +
    "<img id=\"spinner\" src=\"spinner.gif\">";
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        output.innerHTML = "Not supported by this browser.";
    }
}

function showPosition(location) {
	var output = document.getElementById("output");

    output.innerHTML = "Latitude: " + location.coords.latitude + 
    "<br>Longitude: " + location.coords.longitude;	
    
    playSoundForLocation(location);
    
    g_mapObj.setCenter(
    	{
			lat: location.coords.latitude,
			lng: location.coords.longitude
    	}
    );
    
}