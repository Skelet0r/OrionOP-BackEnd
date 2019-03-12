// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
const https = require('https');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;        // set our port


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
router.get('/summonerName/:summoner', function(req, res)
{
	// LET CHECK
	var summoner = req.params.summoner;
	
	while(summoner.charAt(0) === '0')
	{
 		summoner = summoner.substr(1);
	}
	console.log(summoner);
	
	// TO DO
	/* Something */
	var json_response;
	
	var apiKey = 'RGAPI-0af1caff-443d-4528-894a-7d99048d42dc';
	https.get
	(
		'https://la1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + summoner +'?api_key=' + apiKey, 
		(res) =>
		{	
  			res.on
			(
				'data',
				(d) => 
				{
    				//process.stdout.write(d);
					json_response = JSON.parse(d);
					//console.log(json_response.name);
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
	)
	.on
	(
		"close",
		function()
		{
    		console.log('termino xd');
			//console.log(json_response.summonerLevel);
			//console.log(jsonObject);
			//return jsonObject;
			res.json
			(
				{
					//summoner: req.params
					summoner: json_response.name,
					profileIcon: json_response.profileIconId,
					summonerLevel: json_response.summonerLevel,
					accountID: json_response.accountId,
					summonerID: json_response.id
				}
			);
    	}
	);
	
	//TO RESPONSE
	
	
});

router.get('/elo/:summoner', function(req, res)
{
	// TO DO
	/* Something */	
	
	//TO RESPONSE
	res.json
	(
		[
			{
				tier: 'Silver II',
				wins: 25,
				losses: 32,
				queueType: 'Solo Queue',
				leaguePoints: 38
			},
			{
				tier: 'Gold IV',
				wins: 18,
				losses: 12,
				queueType: 'Flex 5 vs 5',
				leaguePoints: 68
			},
			{
				tier: 'Unranked',
				wins: 0,
				losses: 0,
				queueType: 'Flex 3 vs 3',
				leaguePoints: 0
			}
		]
	);
});

router.get('/matches/:summoner', function(req, res)
{
	// TO DO
	/* Something */
	
	//TO RESPONSE
	res.json
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
	);
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

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api/v1/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
