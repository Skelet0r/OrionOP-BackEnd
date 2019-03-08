const express = require('express');
const summoner = require('./getSummoner.js');

const server = express();

server.get
(
	'/api/v1/summoner',
	function(req, res)
	{
		const jsonApi = summoner.getSummonerData('la1', 'Skelet0r', 'RGAPI-6097771b-c7a1-42df-aa16-31ae934fe7ce');
		
		console.log(jsonApi);
	}
);

server.listen
(
	3000,
	function()
	{
		console.log('Server on port 3000');
	}
);