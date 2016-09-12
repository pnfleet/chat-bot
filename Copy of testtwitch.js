/**
 * 
 */

var tmi=require('tmi.js');
soundPlayed=false;
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
	var num=Math.random()*userList.length;
	var winner=userList[num];
	client.action("garbanzoguy", "Raffle is closed, " + winner['display-name'] + "has won the raffle!");
}

client.on('chat', function(channel, user, message, self){
	if (!soundPlayed)
	{
		while(true)
		{

		pSound.play('smw_1-up.wav');
		break;
		}
		soundPlayed=true;
	}
	
	if (raffleEnabled)
	{
		raffleList[raffleList.length]=user;
	}
	uniqueUsers.add(user);

	numMessages++;

	//client.action("garbanzoguy", "Thanks to " +username+ "for the host!");

	if (numMessages % 50 ==0)
	{
		message="!social";
	}
	if (message === "!raffle")
	{
		setTimeout(raffle(raffleList), 100000);
		client.action("garbanzoguy", "Raffle has been enabled for 1 minute.")
		raffleEnabled=true;
	}
	if (message === "!social"){
		client.action("garbanzoguy", "Get updates on my streams at https://twitter.com/garbanzoguy , discord invite: https://t.co/7oprnQptb7");
	}
	if (message === "!hungry"){
		client.action("garbanzoguy", "serves "+user['display-name']+" a fresh bowl of hummus.");
	}
	//client.action("garbanzoguy", user['display-name']+", give me hummus");

	
});
client.on('connected', function(address, port){

	client.action("garbanzoguy", "garbanzobot here, I like hummus");
});

client.on("hosted", function (channel, username, viewers) {
	pSound.play('smw_1-up.wav');
	client.action("garbanzoguy", "Thanks to " +username+ "for the host!");
    // Do your stuff.
});
