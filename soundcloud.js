// initialise soundcloud API
SC.initialize({
  client_id: '790956356ed17e41bfaa38f216122674' // zenpho
});

var url = "https://soundcloud.com/zenpho/bleepciana";
SC.get("/resolve/?url=" + url, {limit: 1}, function(result){
		console.log(result);
	}
);

/*
SC.stream('/zenpho/bleepciana').then(function(player){
  player.play();
});
*/