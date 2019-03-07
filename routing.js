const globalData = {};
const config = require('./config.js');

server.get
(
	'/api/v1/summoner',
	function(req, res)
	{
		config.getSummoner('la1', 'Skelet0r', 'RGAPI-2c8bf7b2-2005-4c1d-a394-cfd9cf83d2a6');
	}
);

module.exports = globalData;