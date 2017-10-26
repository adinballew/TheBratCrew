"use strict";
// Carousel Controller
$('#carouselController').carousel();

// Modal On-click
$(document).on("click", ".open-AddFlavor", function ()
{
	var name = $(this).data('name');
	var flavorId = $(this).data('id');
	var imagepath = $(this).data('imagepath');
	$(".modal-body #flavorName").text(name);
	$(".modal-body #addToCart").attr('href', /add/ + flavorId);
	$(".modal-body #flavorImage").attr('src', imagepath).show();
});

// Qty Select
$(document).ready(function ()
{
	var quantity = 0;
	$('.quantity-right-plus').click(function (e)
	{
		e.preventDefault();
		quantity = parseInt($('#qty-select').val());
		$('#qty-select').val(quantity + 1);
	});

	$('.quantity-left-minus').click(function (e)
	{
		e.preventDefault();
		quantity = parseInt($('#qty-select').val());
		if (quantity > 0)
		{
			$('#qty-select').val(quantity - 1);
		}
	});

});

// Dropdown toggle
$('.dropdown-toggle').dropdown();