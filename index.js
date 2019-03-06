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