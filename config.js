// Variables for API's.
var url_region = '';
var url_base1 = 'https://';
var url_base2 = '.api.riotgames.com/lol/';
var url_api1 = '?api_key=';
var url_api2 = 'RGAPI-2c8bf7b2-2005-4c1d-a394-cfd9cf83d2a6';
    
    
// Variables for URL Summoner.
var url_summoner = '';
var url_getDataSummoner = 'summoner/v4/summoners/by-name/';
    
// Variables for ELO Summoner.
// We are using some variables from first API request.
var url_getEloSummoner = 'league/v4/positions/by-summoner/';


function getSummoner(region, summonerName, apiKey)
{
	url_region = region;
		
	url_summoner = url_base1 + region + url_base2 + url_getDataSummoner + summoner + url_api1 + url_api2;
}

/*
function getElo (summonerID)
{
	url_summoner = url_base1 + url_region + url_base2 + url_getEloSummoner + summonerID + url_api1 + url_api2;
        
	return $http.get( url_summoner );
}*/