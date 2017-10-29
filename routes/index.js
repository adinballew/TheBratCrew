"use strict";
var express = require('express');
var router = express.Router();
var _ = require('underscore');

var fs = require('fs');

var Cart = require('../models/cart');
var products = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));  // Gets JSON file to array

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

router.get('/flavors/:flavor', function (req, res, next)
{
	var type = req.params.flavor;
	var filtered = _.where(products, {type: type});
	res.render('flavors',
		{
			products: filtered
		}
	);
});

router.get('/about', function (req, res, next)
{
	res.render('about', {});
});

router.post('/add/:id', function (req, res, next)
{
	var productId = req.params.id;
	console.log(req.body.nic);
	console.log(req.body.vol);
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
			products: null
		});
	}
	var cart = new Cart(req.session.cart);
	res.render('cart', {
		products: cart.getItems(),
		totalPrice: cart.totalPrice
	});
});

router.post('/cart/:id', function (req, res, next)
{
	var productId = req.params.id;
	var newQty = parseInt(req.body.newQty);
	var oldQty = parseInt(req.body.oldQty);
	var cart = new Cart(req.session.cart ? req.session.cart : {});
	var product = products.filter(function (item)
	{
		return item.id == productId;
	});
	cart.changeQty(product[0], productId, newQty, oldQty);
	req.session.cart = cart;
	res.redirect('/cart');
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
