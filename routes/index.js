"use strict";
var express = require('express');

var router = express.Router();
var _ = require('underscore');

const db = require('../db.js');
const sql = require('../sql/sql.js').queries;

var Cart = require('../models/cart');

function getProducts()
{
	db.any(sql.searchProducts)
		.then(function (result)
		{
			products = result;
		})
		.catch(function (err)
		{
			console.log(err);
		});
}

function getInventory()
{
	db.any(sql.searchInventory)
		.then(function (result)
		{
			inventory = result;
		})
		.catch(function (err)
		{
			console.log(err);
		});
}

var top4;
var products = getProducts();
var inventory = getInventory();

router.get('/', function (req, res, next)
{
	if (!top4)
	{
		db.any(sql.top4)
			.then(function (result)
			{
				top4 = result;
				res.render('index',
					{
						title: 'theBRATcrew',
						products: top4
					});
			})
			.catch(function (err)
			{
				console.log(err);
			});
	}
	else
	{
		res.render('index',
			{
				title: 'theBRATcrew',
				products: top4
			}
		);
	}
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
	var filtered = _.where(products, {flavor_type: type});
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
	var productId = parseInt(req.params.id);
	var nic = req.body.nic;
	var vol = req.body.vol;
	var quantity = parseInt(req.body.qty);
	var cart = new Cart(req.session.cart ? req.session.cart : {});
	var product = inventory.filter(function (item)
	{
		return item.productid == productId && item.nic == nic && item.size == vol;
	});
	cart.add(product[0], product[0].id, quantity);
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
	var id = req.params.id;
	var newQty = parseInt(req.body.newQty);
	var oldQty = parseInt(req.body.oldQty);
	var cart = new Cart(req.session.cart ? req.session.cart : {});
	var product = inventory.filter(function (item)
	{
		return item.id == id;
	});
	cart.changeQty(product[0], id, newQty, oldQty);
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
