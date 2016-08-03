var socket = io();

var friends = <%- JSON.stringify(total) %>;
var friendsNames = friends;
friends = friends.map(function(e){ return e + "<%- user.username %>" });
friends = friends.map(function(e) { return e.split("").sort().join("") });
console.log(friends);

for (var i = 0; i < friends.length; i++) {
	$("body").append('<div class="'+friends[i]+'" style="position:absolute;bottom:0px;left:'+ i*350 +'px"> <form action="" class="white" style="width:300px"><label>'+friendsNames[i]+'</label><input id="'+ friends[i] +'" autocomplete="off" /> </form> </div>');
}

$("."+friends[0]+" form").submit(function(){
	socket.emit(friends[0], $("#"+friends[0]).val());
	$("."+friends[0]).append($('<p>').text("<%= user.username %>: "+$("#"+friends[0]).val()));
	$("#"+friends[0]).val('');
	return false;
});

$("."+friends[1]+" form").submit(function(){
	socket.emit(friends[1], $("#"+friends[1]).val());
	$("."+friends[1]).append($('<p>').text("<%= user.username %>: "+$("#"+friends[1]).val()));
	$("#"+friends[1]).val('');
	return false;
});

socket.on(friends[0], function(msg){
	$("."+friends[0]).append($('<p>').text(friendsNames[0]+": "+msg));
});

socket.on(friends[1], function(msg){
	$("."+friends[1]).append($('<p>').text(friendsNames[1]+": "+msg));
});

socket.on(friendsNames[0], function(msg){
	if (msg=="online"){
		$("."+friends[0]+" form"+" label").css("color","green");
	}

	else{
		$("."+friends[0]+" form"+" label").css("color","red");
	}
});

socket.on(friendsNames[1], function(msg){
	if (msg=="online"){
		$("."+friends[0]+" form"+" label").css("color","green");
	}

	else{
		$("."+friends[0]+" form"+" label").css("color","red");
	}
});