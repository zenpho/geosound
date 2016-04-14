// initialise soundcloud API
SC.initialize({
  client_id: '790956356ed17e41bfaa38f216122674' // zenpho
});

function resolveTrack(url)
{
	SC.get(
		"/resolve.json?url=" + url, 
		{limit:1}, 
		resolveTrack
	);
	
	function resolveTrack(obj){
		var xhr;
		try{
			xhr = obj.request.response;
		}
		catch(er){
			
		};
		
		if ( xhr !== undefined )
		{
			console.log(xhr);
		}
		
	}
}

/*
SC.stream('/zenpho/bleepciana').then(function(player){
  player.play();
});
*/