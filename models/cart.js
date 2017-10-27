"use strict";
module.exports = function Cart(cart)
{
	this.items = cart.items || {};  // Items equals cart items or empty array
	this.totalItems = cart.totalItems || 0;  // Total Items equals total Items or zero
	this.totalPrice = cart.totalPrice || 0;  // Total Price equals total Price or zero

	this.add = function (item, id, quantity)
	{
		var cartItem = this.items[id];  // Cart Item equals item with index of id
		if (!cartItem)  // Initialize cartItem to zero
			cartItem = this.items[id] = {item: item, quantity: 0, price: 0};

		cartItem.quantity += quantity;
		cartItem.price = cartItem.item.price * cartItem.quantity;
		for (var i = 0; i < quantity; i++)
		{
			this.totalItems++;
		}
		this.totalPrice = this.totalPrice + cartItem.price;
	};

	this.remove = function (id)
	{
		this.totalItems -= this.items[id].quantity;
		this.totalPrice -= this.items[id].price;
		delete this.items[id];
	};

	this.getItems = function ()
	{
		var arr = [];
		for (var id in this.items)
		{
			arr.push(this.items[id]);
		}
		return arr;
	};
};