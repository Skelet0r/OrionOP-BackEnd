/*const express = require('express');
const colors = require('colors');
const summoner = require('./getSummoner.js');

const server = express();*/

/*
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
		console.log('Server on port 3000'.green);
	}
);
*/
const express = require('express');
const https = require('https')
const app = express()
const fs = require('fs')

app.get('/', (req, res) => {
  res.send('Hello HTTPS!')
})

https.createServer({}, app).listen(3000, () => {
  console.log('Listening...')
})