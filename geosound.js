SC.initialize({
  client_id: '20db646acdd118c6ca2f6bab01211a3f85337534b2f079b0eec0a9b895b9d20cf11bcbef81fcfcc324d2eafbc52eb1e'
});

var g_locations = {
	1 : {
		latitude : 51.48,
		longitude : -2.51,
		track : 293 		// soundcloud track id
	},
	2 : {
	}
};


function playSoundForLocation(location) {
	// stream track id 293
	SC.stream('/tracks/293').then(function(player){
	  player.play();
	});
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