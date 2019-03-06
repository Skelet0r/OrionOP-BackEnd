/* Display function results from other JS file.
const math = require('./math.js');
console.log(math);
console.log('Números: 3, 5');
console.log(math.add(3, 5));
console.log(math.substract(3, 5));
console.log(math.multiply(3, 5));
console.log(math.divide(3, 5));
*/

/* Display information about OS.
const os = require('os');

console.log(os.platform());
console.log(os.release());
console.log(os.freemem());
console.log(os.totalmem());
*/

/* Creating a txt file.
const fs = require('fs');

fs.writeFile
(
	'./texto.txt',
	'Línea 1 xd /n Línea 2 xd',
	function(err)
	{
		if(err)
		{
			console.log(err);
		}
		else
		{
			console.log('Archivo creado');
		}
	}
);

console.log('A ver xd');*/

/* Display the data from a txt file.
const fs = require('fs');
fs.readFile
(
	'./texto.txt',
	function(err, data)
	{
		if(err)
		{
			console.log(err);
		}
		console.log(data.toString());
	}
);
*/

/* Creating server and display information and log.
const http = require('http');
const colors = require('colors');

const handlerServer = function(req, resp)
{
	resp.writeHead
	(
		200,
		{
			'Content-type': 'text/plain'
		}
	);
	resp.write('Simple text');
	resp.end();
};

const server = http.createServer(handlerServer);

server.listen
(
	3000, 
	function()
	{
		console.log('Server on port 3000'.green);
	}
);*/


/*
const express = require('express');
const colors = require('colors');

const server = express();

server.get
(
	'/',
	function(req, res)
	{
		res.send('<h1>Hola mundo xd</h1>');
	}
);

server.listen
(
	3000,
	function()
	{
		console.log('Server on port 3000'.green);
	}
);
*/


/* Consuming an API.
const https = require('https');

https.get
(
	'https://la1.api.riotgames.com/lol/summoner/v4/summoners/by-name/Skelet0r?api_key=RGAPI-2c8bf7b2-2005-4c1d-a394-cfd9cf83d2a6', 
	(res) =>
	{
  		//console.log('statusCode:', res.statusCode);
  		//console.log('headers:', res.headers);

		//console.log(res.data);
		
  		res.on
		(
			'data',
			(d) => 
			{
    			process.stdout.write(d);
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
*/

/*
const express = require('express');
const colors = require('colors');
const https = require('https');

const server = express();

server.get
(
	'/',
	function(req, res)
	{
		res.send('<h1>Hola mundo xd</h1>');
		
		https.get
		(
			'https://la1.api.riotgames.com/lol/summoner/v4/summoners/by-name/Skelet0r?api_key=RGAPI-2c8bf7b2-2005-4c1d-a394-cfd9cf83d2a6', 
			(res) =>
			{
  				//console.log('statusCode:', res.statusCode);
  				//console.log('headers:', res.headers);

				//console.log(res.data);
		
  				res.on
				(
					'data',
					(d) => 
					{
    					process.stdout.write(d);
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
);

server.listen
(
	3000,
	function()
	{
		console.log('Server on port 3000'.green);
	}
);*/

const express = require('express');
const colors = require('colors');
const summoner = require('./getSummoner.js');

const server = express();

server.get
(
	'/api/v1/summoner',
	function(req, res)
	{
		res.send('<h1>Hola mundo xd</h1>');
		summoner.getSummonerData('la1', 'Adele Bebe', 'RGAPI-2c8bf7b2-2005-4c1d-a394-cfd9cf83d2a6');
	}
);

server.listen
(
	3000,
	function()
	{
		console.log('Server on port 3000'.green);
	}
);

