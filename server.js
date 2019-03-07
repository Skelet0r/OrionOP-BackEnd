const express = require('express');
const colors = require('colors');
const summoner = require('./routing.js');

const server = express();

server.listen
(
	3000,
	function()
	{
		console.log('Server on port 3000'.green);
	}
);