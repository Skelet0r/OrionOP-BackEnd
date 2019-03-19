// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var cors = require('cors');
const https = require('https');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var port = process.env.PORT || 3000;        // set our port


// =======================================================//
// GLOBAL VARIABLES FOR APIS.
var apiKey = 'RGAPI-513dc0a5-063f-408c-8309-74046824f552';


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res)
{
	res.json
	(
		{
			message: 'Welcome :)'
		}
	);
});

router.get('/message', function(req, res)
{
	res.json
	(
		{
			message: 'hooray! welcome to our api!'
		}
	);
});


// ================================================================//
// WE START HERE! :D

//Web service to get a Summoner basic data.
router.get('/summonerName/:region/:regionName/:summoner', function(req, res)
{
	
	var summoner = req.params.summoner;
	var region = req.params.region;
	var regionName = req.params.regionName;
	console.log('Summoner: ' + summoner + ', region: ' + region);
	
	var json_response;	
	var response_status;
	
	var url = 'https://' + region + '.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + (encodeURIComponent(summoner)) +'?api_key=' + apiKey;
	console.log(url);
	
	https.get
	(
		url, 
		(res) =>
		{	
  			res.on
			(
				'data',
				(d) => 
				{
					json_response = JSON.parse(d);
  				}
			);
			
			response_status = res.statusCode;
		}
	)
	.on
	(
		'error', 
		(e) =>
		{
			res.json
			(
				{
					message: 'An error has occurred, code:' + e
				}
			);
		}
	)
	.on
	(
		"close",
		function()
		{
			console.log(response_status);
			if(response_status == 200)
			{
				res.json
				(
					{
						status: response_status,
						region: region,
						regionName: regionName,
						summoner: json_response.name,
						profileIcon: 'http://localhost:3000/public/icons/' + json_response.profileIconId + '.png',
						summonerLevel: json_response.summonerLevel,
						accountID: json_response.accountId,
						summonerID: json_response.id
					}
				);
			}
			
			else if(response_status == 403)
			{
				res.json
				(
					{
						status: response_status,
						message: 'The API key has expired!'
					}
				);
			}
			
			else if(response_status == 404)
			{
				res.json
				(
					{
						status: response_status,
						message: 'We couldnt find a summoner.'
					}
				);
			}
			
			else if(response_status == 500)
			{
				res.json
				(
					{
						status: response_status,
						message: 'Problems with Riot Services.'
					}
				);
			}
			
			else
			{
				console.log('valio kk');
				res.json
				(
					{
						status: response_status,
						message: 'An error has occurred, code:' + response_status
					}
				);
			}
    	}
	);	
});

//Web service to get a Summoner basic data.
router.get('/elo/:region/:summonerID', function(req, res)
{
	// TO DO
	/* Something */
	var summonerID = req.params.summonerID;
	var region = req.params.region;
	//console.log(summoner);
	
	var url = 'https://' + region + '.api.riotgames.com/lol/league/v4/positions/by-summoner/' + summonerID +'?api_key=' + apiKey;
	
	var json_response;	
	var response_status;
	
	https.get
	(
		url, 
		(res) =>
		{	
  			res.on
			(
				'data',
				(d) => 
				{
					json_response = JSON.parse(d);
  				}
			);
			
			response_status = res.statusCode;
		}
	)
	.on
	(
		'error', 
		(e) =>
		{
			res.json
			(
				{
					message: 'An error has occurred, code:' + e
				}
			);
		}
	)
	.on
	(
		"close",
		function()
		{
			console.log(response_status);
			//console.log(json_response);
			console.log(json_response.length);
			
			var eloEmpty = 
			{
				icon: 'http://localhost:3000/public/tier/unranked.png',
				tier: 'Unranked',
				wins: 'N/A',
				losses: 'N/A',
				leagueName: 'N/A',
				queueType: 'N/A',
				leaguePoints: 'N/A',
			};
			
			if(response_status == 200)
			{
				if(json_response.length == 0)
				{
					res.json
					(
						[
							eloEmpty,
							eloEmpty,
							eloEmpty
						]
					);
				}
				else if(json_response.length == 1)
				{
					
					var tier = ((json_response[0].tier).toLowerCase() + ' ' + json_response[0].rank);
					tier = tier.charAt(0).toUpperCase() + tier.slice(1);
					
					var icon_tier = 'http://localhost:3000/public/tier/' + json_response[0].tier.toLowerCase() + '_' + json_response[0].rank + '.png';
					
					if(json_response[0].queueType == 'RANKED_SOLO_5x5')
					{
						res.json
						(
							[
								{
									icon: icon_tier,
									tier: tier,
									wins: json_response[0].wins,
									losses: json_response[0].losses,
									leagueName: json_response[0].leagueName,
									queueType: json_response[0].queueType,
									leaguePoints: json_response[0].leaguePoints
								},
								eloEmpty,
								eloEmpty
							]
						);
					}
					else if(json_response[0].queueType == 'RANKED_FLEX_SR')
					{
						res.json
						(
							[
								eloEmpty,
								{
									icon: icon_tier,
									tier: tier,
									wins: json_response[0].wins,
									losses: json_response[0].losses,
									leagueName: json_response[0].leagueName,
									queueType: json_response[0].queueType,
									leaguePoints: json_response[0].leaguePoints
								},
								eloEmpty
							]
						);
					}
					else
					{
						res.json
						(
							[
								eloEmpty,
								eloEmpty,
								{
									icon: icon_tier,
									tier: tier,
									wins: json_response[0].wins,
									losses: json_response[0].losses,
									leagueName: json_response[0].leagueName,
									queueType: json_response[0].queueType,
									leaguePoints: json_response[0].leaguePoints
								}
							]
						);
					}
				}
				else if(json_response.length == 2)
				{
					console.log('Dos colas en ranked :o');
					
					var tier1 = ((json_response[0].tier).toLowerCase() + ' ' + json_response[0].rank);
					tier1 = tier1.charAt(0).toUpperCase() + tier1.slice(1);
					
					var tier2 = ((json_response[1].tier).toLowerCase() + ' ' + json_response[1].rank);
					tier2 = tier2.charAt(0).toUpperCase() + tier2.slice(1);
					
					var icon_tier1 = 'http://localhost:3000/public/tier/' + json_response[0].tier.toLowerCase() + '_' + json_response[0].rank + '.png';
					var icon_tier2 = 'http://localhost:3000/public/tier/' + json_response[1].tier.toLowerCase() + '_' + json_response[1].rank + '.png';
					
					if(json_response[0].queueType == 'RANKED_SOLO_5x5')
					{
						console.log('Ranked soloq');
						if(json_response[1].queueType == 'RANKED_FLEX_SR')
						{
							res.json
							(
								[
									{
										icon: icon_tier1,
										tier: tier1,
										wins: json_response[0].wins,
										losses: json_response[0].losses,
										leagueName: json_response[0].leagueName,
										queueType: json_response[0].queueType,
										leaguePoints: json_response[0].leaguePoints
									},
									{
										icon: icon_tier2,
										tier: tier2,
										wins: json_response[1].wins,
										losses: json_response[1].losses,
										leagueName: json_response[1].leagueName,
										queueType: json_response[1].queueType,
										leaguePoints: json_response[1].leaguePoints
									},
									eloEmpty
								]
							);
						}
						else
						{
							res.json
							(
								[
									{
										icon: icon_tier1,
										tier: tier1,
										wins: json_response[0].wins,
										losses: json_response[0].losses,
										leagueName: json_response[0].leagueName,
										queueType: json_response[0].queueType,
										leaguePoints: json_response[0].leaguePoints
									},
									{
										icon: icon_tier2,
										tier: tier2,
										wins: json_response[1].wins,
										losses: json_response[1].losses,
										leagueName: json_response[1].leagueName,
										queueType: json_response[1].queueType,
										leaguePoints: json_response[1].leaguePoints
									},
									eloEmpty
								]
							);
						}
					}
					else if(json_response[0].queueType == 'RANKED_FLEX_SR')
					{
						console.log('Ranked Flex');
					}
				}
				
				else
				{
					console.log('ste men tiene las tres colas en ranked :o');
					// TO DO.
				}
			}
			
			else if(response_status == 403)
			{
				res.json
				(
					{
						status: response_status,
						message: 'The API key has expired!'
					}
				);
			}
			
			else if(response_status == 404)
			{
				res.json
				(
					{
						status: response_status,
						message: 'We couldnt find a summoner.'
					}
				);
			}
			
			else if(response_status == 500)
			{
				res.json
				(
					{
						status: response_status,
						message: 'Problems with Riot Services.'
					}
				);
			}
			
			else
			{
				res.json
				(
					{
						status: response_status,
						message: 'An error has occurred, code:' + response_status
					}
				);
			}
    	}
	);
});

router.get('/matches/:region/:summoner', function(req, res)
{
	// TO DO
	/* Something */
	var region = req.params.region;
	var summoner = req.params.summoner;
	
	//console.log('Summoner: ' + summoner + ', region: ' + region);
	
	var url1 = 'https://' + region + '.api.riotgames.com/lol/match/v4/matchlists/by-account/' + summoner +'?api_key=' + apiKey;
	
	var json_response;	
	var response_status;
	
	https.get
	(
		url1, 
		(res) =>
		{	
  			res.on
			(
				'data',
				(d) => 
				{
					/*var last10 = d.filter(function(el, index)
					{
  						return index >= d.length - 10;
					});
					
					console.log(last10);
					
					//process.stdout.write(d);*/
					
					json_response = JSON.parse(d);
					//json_response = bodyParser(d);
					//console.log(json_response);
					//json_response = bodyParser.d;
  				}
			);
			//json_response = res['data'];
			response_status = res.statusCode;
		}
	)
	.on
	(
		'error', 
		(e) =>
		{
			res.json
			(
				{
					message: 'An error has occurred, code:' + e
				}
			);
		}
	)
	.on
	(
		"close",
		function()
		{
			/*res.json
			(
				json_response
			);*/
			//json_response[0]
			//console.log(json_response.matches);
			console.log(response_status);
			
			if(response_status == 200)
			{
				
				
				var arrayMatches = [];
			
				for(var i = 0; i <= 10; i++)
				{
					//console.log(json_response.matches[i].gameId);
					arrayMatches[i] = 
					{
						gameId: json_response.matches[i].gameId,
						champId: json_response.matches[i].champion
					};
				}
				
				https.get
				(
					'https://' + region + '.api.riotgames.com/lol/match/v4/matches/' + arrayMatches[0] +'?api_key=' + apiKey, 
					(result) =>
					{	
  						result.on
						(
							'data',
							(data) => 
							{
					
								process.stdout.write(data);
  							}
						);
					}
				)
				.on
				(
					'error', 
					(error) =>
					{
						result.json
						(
							{
								message: 'An error has occurred, code:' + error
							}
						);
					}
				)
				.on
				(
					"close",
					function()
					{
			
						//console.log(arrayMatches);
					}
				);
				
				res.json
				(
					arrayMatches
				);
			}
			else
			{
				res.json
				(
					{ message: 'We have some errors, sorry.' }
				);
			}
			
		}
	);
	
	//TO RESPONSE
	/*res.json
	(
		{
			icon: 'someUrl.jpg',
			spell1: 'someUrl.jpg',
			spell2: 'someUrl.jpg',
			gameType: 'Ranked game',
			timeAgo: '14 hours ago',
			kda1: '21/1/3',
			kda2: '27.00:1 KDA'
		}
	);*/
});

router.get('/matches/:queue/:summoner', function(req, res)
{
	// TO DO
	/* Something */
	
	//TO RESPONSE
	res.json
	(
		{
			summoner: req.params
		}
	);
});

router.get('/duos/:summoner', function(req, res)
{
	// TO DO
	/* Something */
	
	//TO RESPONSE
	res.json
	(
		[
			{
				summoner: 'the komander xD',
				icon: 'someUrl.jpg',
				wins: 10,
				losses: 6,
				winRate: '60%'
			},
			{
				summoner: 'Darkay03',
				icon: 'someUrl.jpg',
				wins: 10,
				losses: 6,
				winRate: '60%'
			},
			{
				summoner: 'Lord Darkblazer',
				icon: 'someUrl.jpg',
				wins: 10,
				losses: 6,
				winRate: '60%'
			}
		]
	);
});

router.get('/rotations/', function(req, res)
{
	// TO DO
	/* Something */
	
	
	//TO RESPONSE
	res.json
	(
		{
			champion: 'Ashe',
			icon: 'someUrl.jpg',
			position: 'ADC, Support'
		}
	);
});

router.get('/public/', express.static( "public" ));

// more routes for our API will happen here


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api/{{ + version }}
//app.use( express.static( "public" ) );
app.use('/public', express.static("public"))
app.use('/api/v1/', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
