"use strict";
var express = require('express');
var router = express.Router();

var fs = require('fs');

var Cart = require('../models/cart');
var products = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));

router.get('/', function (req, res, next)
{
	res.render('index',
		{
			title: 'theBRATcrew',
			products: products
		}
	);
});

router.get('/flavors', function (req, res, next)
{
	res.render('flavors',
		{
			products: products
		}
	);
});

router.get('/about', function (req, res, next)
{
	res.render('about', {});
});

router.post('/test/:id', function (req, res, next)
{
	res.send("Id: " + req.params.id + " Quantity: " + req.body.qty);
});

router.post('/add/:id', function (req, res, next)
{
	var productId = req.params.id;
	var quantity = parseInt(req.body.qty);
	var cart = new Cart(req.session.cart ? req.session.cart : {});
	var product = products.filter(function (item)
	{
		return item.id == productId;
	});
	cart.add(product[0], productId, quantity);
	req.session.cart = cart;
	res.redirect('/');
});

router.get('/cart', function (req, res, next)
{
	if (!req.session.cart)
	{
		return res.render('cart', {
			title: 'Cart',
			products: null
		});
	}
	var cart = new Cart(req.session.cart);
	res.render('cart', {
		title: 'Cart',
		products: cart.getItems(),
		totalPrice: cart.totalPrice
	});
});

router.get('/remove/:id', function (req, res, next)
{
	var productId = req.params.id;
	var cart = new Cart(req.session.cart ? req.session.cart : {});

	cart.remove(productId);
	req.session.cart = cart;
	res.redirect('/cart');
});

module.exports = router;
