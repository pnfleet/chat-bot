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
		client.action("garbanzoguy", "Raffle is closed.");//no entrants; close raffle, without whining about how empty my chat is :p
		}
	else
	{
		//randomly choose a winner
		var randNum=Math.random();
		var finalNum=randNum*numUsers;
		
		var num=Math.floor(finalNum);
		console.log(numUsers);
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
	
	case "!raffle"://start a 1 minute raffle
		setTimeout(function(){raffle(raffleList)}, 60000);
		client.action("garbanzoguy", "Raffle has been enabled for 1 minute.")
		raffleEnabled=true;
		break;
	case "!rafflelong"://start a 5 minute raffle
		setTimeout(function(){raffle(raffleList)}, 300000);
		client.action("garbanzoguy", "Raffle has been enabled for 5 minutes.")
		raffleEnabled=true;
		break;
	case "!social"://display twitter info and discord invite
		client.action("garbanzoguy", "Get updates on my streams at https://twitter.com/garbanzoguy , discord invite: https://t.co/7oprnQptb7");
		break;
	case "!hungry":// serve the chatter some hummus
		client.action("garbanzoguy", "serves "+user['display-name']+" a fresh bowl of hummus.");
		break;
	case "!quote"://TODO: have a database of quotes that the chatters can add to
		
	default:
	//client.action("garbanzoguy", user['display-name']+", give me hummus");

	
}});
client.on('connected', function(address, port){

	client.action("garbanzoguy", "garbanzobot here, I like hummus");
});

client.on("hosted", function (channel, username, viewers) {
	playSound('sound/smw_1-up.wav', 1000);//Super Mario World 1up sound effect is played
	client.action("garbanzoguy", "Thanks to " +username+ "for the host!");
    // Do your stuff.
});
