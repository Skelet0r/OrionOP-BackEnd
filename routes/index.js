const express = require('express');
const router = express.Router();

var items = 
[
	{id: 1, name: 'product1'},
	{id: 2, name: 'product2'},
	{id: 3, name: 'product3'}
];

router.get('/', (req, res) =>
{
	//res.end('Hello world.');
	res.render('index', 
	{
		title: 'Welcome'
	});
});

router.get('/products', (req, res, next) =>
{
	//res.end('Hello world.');
	res.render('products', 
	{
		title: 'List of products',
		items: items
	});
});

module.exports = router; 