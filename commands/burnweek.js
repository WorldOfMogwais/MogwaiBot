module.exports = {
	name: 'burnweek',
	description: 'Shows the amoound of MOG burned this week',
	execute(message, args) {    
//How many MOG have been burned this week
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
};




    