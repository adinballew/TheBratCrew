"use strict";
// https://github.com/gtsopour/nodejs-shopping-cart
module.exports = function Cart(cart)
{
	this.items = cart.items || {};  // Items equals cart items or empty array
	this.totalItems = cart.totalItems || 0;  // Total Items equals total Items or zero
	this.totalPrice = cart.totalPrice || 0;  // Total Price equals total Price or zero

	this.add = function (item, id, quantity)
	{
		var cartItem = this.items[id];  // Cart Item equals item with index of id
		if (!cartItem)  // Initialize cartItem
		{
			this.items[id] = {item: item, quantity: 0, price: 0};
			cartItem = this.items[id];
		}

		cartItem.quantity += quantity;
		cartItem.price = cartItem.item.price * cartItem.quantity;

		this.totalItems = this.totalItems + cartItem.quantity;
		this.totalPrice = this.totalPrice + cartItem.price;
	};

	this.remove = function (id)
	{
		this.totalItems -= this.items[id].quantity;
		this.totalPrice -= this.items[id].price;
		delete this.items[id];
	};

	this.changeQty = function (item, id, newQty, oldQty)
	{
		var cartItem = this.items[id];  // Cart Item equals item with index of id
		var difference = Math.abs(newQty - oldQty);

		cartItem.quantity = newQty;
		cartItem.price = cartItem.item.price * cartItem.quantity;
		if (newQty > oldQty)
		{
			this.totalItems += difference;
			this.totalPrice += cartItem.item.price * difference;
		}
		else
		{
			this.totalItems -= difference;
			this.totalPrice -= cartItem.item.price * difference;
		}
	};

	this.getItems = function ()
	{
		var arr = [];
		for (var id in this.items)
		{
			if (this.items.hasOwnProperty(id))
			{
				arr.push(this.items[id]);
			}
		}
		return arr;
	};
};