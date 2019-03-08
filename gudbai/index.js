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
	// TO DO
	/* Something */
	
	//TO RESPONSE
	res.json
	(
		{
			//summoner: req.params
			summoner: 'Skelet0r',
			profileIcon: 3005,
			summonerLevel: 184,
			accountID: 'Ou29VqJRC1WxaCcGX35hsPD_wnSh3erN1TpfVlCpTVPQQCE',
			summonerID: '9bI91QCHTO_ZLWUdK0BYf0YqDU0nFlO5w1YmtzT897ydhA'
		}
	);
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
			summoner: req.params
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
		{
			summoner: req.params
		}
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
			summoner: req.params
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
