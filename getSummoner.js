const Summoner = {};

const https = require('https');

function getSummonerData(region, summonerName, apiKey)
{	
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
					var jsonObject = JSON.parse(d);
					console.log(jsonObject);
  				}
			);
		}
	)
	.on
	(
		'error', 
		(e) =>
		{
  			console.error(e);
		}
	);
}

Summoner.getSummonerData = getSummonerData;

module.exports = Summoner;