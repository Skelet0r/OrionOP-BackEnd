const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const routes = require('./routes/index.js');

// Settings.
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('port', process.env.PORT || 3000);


// Middlewares.
app.use((req, res, next) => 
{
	console.log(`${req.url} - ${req.method}`);
	next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// Routes.
app.use(routes);


// Static files.
app.use(express.static(path.join(__dirname, 'public')));


// Start the server.
app.listen(app.get('port'), () => 
{
	console.log('Server on port ' + app.get('port') + '.')
});