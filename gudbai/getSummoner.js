const Summoner = {};

const https = require('https');

function getSummonerData(region, summonerName, apiKey)
{	
	var jsonObject;
	
	apiKey = 'RGAPI-0af1caff-443d-4528-894a-7d99048d42dc';
	
	https.get
	(
		'https://' + region + '.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+ summonerName + '?api_key=' + apiKey, 
		(res) =>
		{	
  			res.on
			(
				'data',
				(d) => 
				{
    				//process.stdout.write(d);
					jsonObject = JSON.parse(d);
					
					//return jsonObject;
  				}
			);/*
			res.on("close", function()
			{
        		console.log('termino xd');
				//console.log(jsonObject);
				return jsonObject;
    		});*/
		}
	)
	.on
	(
		'error', 
		(e) =>
		{
  			console.error(e);
		}
	).on("close", function()
			{
        		console.log('termino xd');
				console.log(jsonObject);
				return jsonObject;
    		});
}

Summoner.getSummonerData = getSummonerData;

module.exports = Summoner;