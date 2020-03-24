
const fs = require('fs');

// require the discord.js module
const Discord = require('discord.js');
const { prefix, token, dayRepID } = require('./config.json');
const schedule = require('node-schedule');

// create a new Discord client
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});

//Daily Report sheduler

var j = schedule.scheduleJob('50 50 22 * * *', function(){
	DailyRep();
	console.log('Daily repport executed');
  });


client.on('message', message => {

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'ping') {
		client.commands.get('ping').execute(message, args);
	}else if (command === 'burntoday') {
		client.commands.get('burntoday').execute(message, args);
	}else if (command === 'burnweek') {
		client.commands.get('burnweek').execute(message, args);
	}else if (command === 'burnmonth') {
		client.commands.get('burnmonth').execute(message, args);
	}	
});


// login to Discord with your app's token
client.login(token);

//Daily Report

function DailyRep(){

	const channel = client.channels.cache.get(dayRepID);
	channel.send('This is todays daily MOG Burn Repport: ');
	var burnMogToday,burnMogWeek,burnMogMonth	
	//Daily Value	
	var request1 = require('request');
	request1(
    'https://analytics.mogwaicoin.org/?module=API&method=API.get&idSite=3&period=day&date=today&columns=revenue&format=json&token_auth=21da93f1dd7d86e815ae6060aba58554', 
    function (error, response, body) {
        if (response.statusCode === 200) {
            var bodyObj = JSON.parse(body);
            burnMogToday = bodyObj.value;
		console.log('Result Report Today: ' + burnMogToday);
		const channel = client.channels.cache.get(dayRepID);
		channel.send('Today : ' + burnMogToday);
        }
    }
	);
	//Weekly Value
	var request2 = require('request');
	request2(
		'https://analytics.mogwaicoin.org/?module=API&method=API.get&idSite=3&period=week&date=today&columns=revenue&format=json&token_auth=21da93f1dd7d86e815ae6060aba58554', 
		function (error, response, body) {	
			if (response.statusCode === 200) {
				var bodyObj = JSON.parse(body);
				burnMogWeek = bodyObj.value;
			console.log('Result Report Week: ' + burnMogWeek);
			const channel = client.channels.cache.get(dayRepID);
			channel.send('Week : ' + burnMogWeek);
			}
		}
		);
	
		// Montly Value
		var request3 = require('request');
		request3(
			'https://analytics.mogwaicoin.org/?module=API&method=API.get&idSite=3&period=month&date=today&columns=revenue&format=json&token_auth=21da93f1dd7d86e815ae6060aba58554', 
			function (error, response, body) {	
				if (response.statusCode === 200) {
					var bodyObj = JSON.parse(body);	
					burnMogMonth = bodyObj.value;
				console.log('Result Report Month: ' + burnMogMonth);
				const channel = client.channels.cache.get(dayRepID);
				channel.send('Month : ' + burnMogMonth);
				}
			}
			);
		}
	


