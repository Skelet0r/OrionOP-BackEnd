const Summoner = {};

const https = require('https');

function getSummonerData(region, summonerName, apiKey)
{	
	var jsonObject;
	
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
					//console.log(jsonObject);
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
	return jsonObject;
	if(jsonObject != null)
	{
	   return jsonObject;
	}
	else
	{
		return 'Nothing bro :(';
	}
}

Summoner.getSummonerData = getSummonerData;

module.exports = Summoner;