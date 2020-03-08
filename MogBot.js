
const fs = require('fs');

// require the discord.js module
const Discord = require('discord.js');
const { prefix, token, dayRepID } = require('./config.json');

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


//Daily Report
client.setInterval(reportDay, 5000);

	function reportDay(){
	
		var burnMogToday,burnMogWeek,burnMogMonth
		
	//Daily Value	
	var request = require('request');
	request(
    'https://analytics.mogwaicoin.org/?module=API&method=API.get&idSite=3&period=day&date=today&columns=revenue&format=json&token_auth=21da93f1dd7d86e815ae6060aba58554', 
    function (error, response, body) {
        if (response.statusCode === 200) {
            var bodyObj = JSON.parse(body);
            burnMogToday = bodyObj.value;
		console.log('Result Report Today:: ' + burnMogToday);
		const channel = client.channels.cache.get(dayRepID);
		channel.send('Today : ' + burnMogToday);
        }
    }
	);
	//Weekly Value
	request(
		'https://analytics.mogwaicoin.org/?module=API&method=API.get&idSite=3&period=week&date=today&columns=revenue&format=json&token_auth=21da93f1dd7d86e815ae6060aba58554', 
		function (error, response, body) {	
			if (response.statusCode === 200) {
				var bodyObj = JSON.parse(body);
				burnMogWeek = bodyObj.value;
			console.log('Result Report Week: ' + burnMogWeek);
			const channel = client.channels.cache.get('568083152200007697');
			channel.send('Week : ' + burnMogWeek);
			}
		}
		);
		// Montly Value
		request(
			'https://analytics.mogwaicoin.org/?module=API&method=API.get&idSite=3&period=month&date=today&columns=revenue&format=json&token_auth=21da93f1dd7d86e815ae6060aba58554', 
			function (error, response, body) {	
				if (response.statusCode === 200) {
					var bodyObj = JSON.parse(body);	
					burnMogMonth = bodyObj.value;
				console.log('Result Report Month: ' + burnMogMonth);
				const channel = client.channels.cache.get('568083152200007697');
				channel.send('Month : ' + burnMogMonth);
				}
			}
			);

	}


client.on('message', message => {

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();


	if (command === 'ping') {
		message.channel.send('Ponggggg.');
	}

	//How many MOG have been burned today
	else if (message.content === `${prefix}burntoday`) {
	var request = require('request');
	request(
    'https://analytics.mogwaicoin.org/?module=API&method=API.get&idSite=3&period=day&date=today&columns=revenue&format=json&token_auth=21da93f1dd7d86e815ae6060aba58554', 
    function (error, response, body) {

        if (response.statusCode === 200) {
            var bodyObj = JSON.parse(body);

            var burnMog = bodyObj.value;
        console.log('Ergebnisse insgesamt: ' + burnMog);
		 
		message.channel.send(`Today : ${burnMog} MOG have been burned`);
        }
    }
	);
	}
	//How many MOG have been burned this week
	else if (message.content === `${prefix}burnweek`) {
		var request = require('request');
		request(
		'https://analytics.mogwaicoin.org/?module=API&method=API.get&idSite=3&period=week&date=today&columns=revenue&format=json&token_auth=21da93f1dd7d86e815ae6060aba58554', 
		function (error, response, body) {
	
			if (response.statusCode === 200) {
				var bodyObj = JSON.parse(body);
	
				var burnMog = bodyObj.value;
			console.log('Ergebnisse insgesamt: ' + burnMog);
			 
			message.channel.send(`This Week : ${burnMog} MOG have been burned`);
			}
		}
		);
		}
		
		//How many MOG have been burned this month
		else if (message.content === `${prefix}burnmonth`) {
			var request = require('request');
			request(
			'https://analytics.mogwaicoin.org/?module=API&method=API.get&idSite=3&period=month&date=today&columns=revenue&format=json&token_auth=21da93f1dd7d86e815ae6060aba58554', 
			function (error, response, body) {
		
				if (response.statusCode === 200) {
					var bodyObj = JSON.parse(body);
		
					var burnMog = bodyObj.value;
				console.log('Ergebnisse insgesamt: ' + burnMog);
				 
				message.channel.send(`This Month : ${burnMog} MOG have been burned`);
				}
			}
			);
			}
});


// login to Discord with your app's token
client.login(token);

