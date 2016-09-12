/**
 * 
 */

var tmi=require('tmi.js');
var nMPlayer=require('node-mplayer');
var MPlayer=require('simple-mplayer');





var pSound=require('play-sound')(opts={})
var raffleEnabled=false;
var raffleList=[];
var options=
	{
		options: {
			debug: true
		},
		connection: {
			cluster: "aws",
			reconnect: true
		},
		identity: {
			username: "garbanzobot",
			password: "oauth:n4zh84xspil2dtj9k2qi1tadkqub34"
		},
		channels: ["garbanzoguy"]
	};



var client=new tmi.client(options);
client.color('Coral');
var numMessages=0;
var uniqueUsers=new Set();
client.connect();

function raffle(userList)
{
	var numUsers=userList.length;
	if (numUsers==0)
		{
		client.action("garbanzoguy", "Raffle is closed.");
		}
	else
	{
		var randNum=Math.random();
		var finalNum=randNum*numUsers;
		console.log(randNum);
		console.log(userList.length);
		var num=Math.floor(finalNum);
		console.log(num);
		console.log(userList.toString());
		var winner=userList[num];
		client.action("garbanzoguy","Raffle is closed, " + winner['display-name'] + " has won the raffle!");
		raffleEnabled=false;
	}

}
function playSound(filename, length)
{
	var playerInstance=new MPlayer(filename);
	playerInstance.play({loop: 1});
	setTimeout(function () {
	    playerInstance.stop(); // and stop definitely seven seconds after resuming 
	}, length);
	//playerInstance.play();
	
}
client.on('chat', function(channel, user, message, self){

	
	if (raffleEnabled)
	{
		raffleList.push(user);
	}
	uniqueUsers.add(user);

	numMessages++;

	//client.action("garbanzoguy", "Thanks to " +username+ "for the host!");

	if (numMessages % 50 ==0)
	{
		message="!social";
	}
	switch (message){
	
	case "!raffle":
		setTimeout(function(){raffle(raffleList)}, 5000);
		client.action("garbanzoguy", "Raffle has been enabled for 1 minute.")
		raffleEnabled=true;
		break;
	case "!rafflelong":
		setTimeout(function(){raffle(raffleList)}, 300000);
		client.action("garbanzoguy", "Raffle has been enabled for 5 minutes.")
		raffleEnabled=true;
		break;
	case "!social":
		client.action("garbanzoguy", "Get updates on my streams at https://twitter.com/garbanzoguy , discord invite: https://t.co/7oprnQptb7");
		break;
	case "!hungry":
		client.action("garbanzoguy", "serves "+user['display-name']+" a fresh bowl of hummus.");
		break;
	case "!quote":
		
	default:
	//client.action("garbanzoguy", user['display-name']+", give me hummus");

	
}});
client.on('connected', function(address, port){

	client.action("garbanzoguy", "garbanzobot here, I like hummus");
});

client.on("hosted", function (channel, username, viewers) {
	pSound.play('smw_1-up.wav', 1000);
	client.action("garbanzoguy", "Thanks to " +username+ "for the host!");
    // Do your stuff.
});
