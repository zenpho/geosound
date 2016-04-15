// initialise soundcloud API
SC.initialize({
  client_id: '790956356ed17e41bfaa38f216122674' // zenpho
});

function scResolveTrack(url)
{
	console.log("resolve " + url);
	
	var xhr = new XMLHttpRequest();
	xhr.open('GET', "http://soundcloud.com/resolve.json?url="+url, true);
	xhr.onload = function() {
		var resp = this.response;
		console.log(resp);
	}
	xhr.send();
}

function scPlayTrack(trackId)
{
	SC.stream('/tracks/' + trackId).then(function(player){
	  player.play();
	});
}

// //////

var g_mapObj;
var g_youAreHere;
var g_kmlLayer;

// //////

// Include the libraries=geometry parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY&libraries=geometry">

function initGoogleMap() {	
	g_mapObj = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: 51, lng: -2},
	  zoom: 10,
	});
	
    g_youAreHere = new google.maps.Marker({
		position: {lat: 0, lng: 0},
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
	  
	var kmlUrl = 'http://zenpho.github.io/geosound/zpo.kml';
	function kmlToGeoJson(url)
	{
		var xhr = new XMLHttpRequest();
		xhr.open('GET', kmlUrl, true);
		xhr.onload = function() {
			var geoJson = toGeoJSON.kml(this.responseXML);
			g_mapObj.data.addGeoJson(geoJson);

			// bind mouseover event to playAudioForFeature()
			g_mapObj.data.addListener('mouseover', playAudioForFeature);
			
			// display each feature description
			//g_mapObj.data.forEach(function(f){console.log(f.R.description)})
		};
		xhr.send();
	}
	kmlToGeoJson(kmlUrl);
		
	/*	
	google.maps.event.addListener(g_mapObj, 'mousemove', function (event) {
		displayCoordinates(event.latLng);               
	});
	*/
}

// //////

function doStartup() {
	initGoogleMap();
	//getLocation();
}

// //////

function displayCoordinates(latlng) {
	var lat = latlng.lat();
	var lng = latlng.lng();
	console.log("Mousepos " + lat + ", " + lng);	
}

function playAudioForFeature(event) {
	var feature = event.feature;
	var description = feature.getProperty('description');
	console.log("playAudioForFeature " + description);	
	scResolveTrack(description);
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