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

function playSoundForLocation(location) {
	for each (obj in g_locations) {
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
}