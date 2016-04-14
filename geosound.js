// initialise soundcloud API
SC.initialize({
  client_id: '790956356ed17e41bfaa38f216122674' // zenpho
});

console.log("v1");

// is a number between a minimum and maximum?
Number.prototype.between = function (min, max) {
    return this > min && this < max;
};

var g_mapObj;
var g_youAreHere;
var g_kmlLayer;

// //////

// Include the libraries=geometry parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY&libraries=geometry">

function initGoogleMap() {	
	g_mapObj = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: 0, lng: 0},
	  zoom: 5,
	});
	
    g_youAreHere = new google.maps.Marker({
		position: {lat: 51, lng: -2},
		map: g_mapObj,
		icon: {
		  path: google.maps.SymbolPath.CIRCLE,
		  fillColor: 'red',
		  fillOpacity: .2,
		  strokeColor: 'white',
		  strokeWeight: .5,
		  scale: 10
		}
	  });
	  
	g_kmlLayer = new google.maps.KmlLayer({
		url: 'http://zenpho.github.io/geosound/zones.kml',
		map: g_mapObj
	  });

	google.maps.event.addListener(g_mapObj, 'mousemove', function (event) {
		displayCoordinates(event.latLng);               
	});
	
	g_kmlLayer.addListener(g_mapObj, 'click', function(event) {
		var fd = kmlEvent.featureData;
		console.log(fd);
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

function displayCoordinates(latlng) {
	var lat = latlng.lat();
	var lng = latlng.lng();
	console.log("Mousepos " + lat + ", " + lng);
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
    
    // scroll map to location and show your location
    var latLng = {
		lat: location.coords.latitude,
		lng: location.coords.longitude
	};
	g_youAreHere.setPosition(latLng);
    g_mapObj.setCenter( latLng );
    g_mapObj.setZoom(11);

	//    
	//playSoundForLocation(location);
    
}