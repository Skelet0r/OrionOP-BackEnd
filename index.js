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

