"use strict";
// Carousel Controller
$('#carouselController').carousel();

// Qty Select
$(document).ready(function ()
{
	var quantity = 0;
	$('.quantity-right-plus').click(function (e)
	{
		e.preventDefault();
		quantity = parseInt($('#qty').val());
		$('#qty').val(quantity + 1);
	});

	$('.quantity-left-minus').click(function (e)
	{
		e.preventDefault();
		quantity = parseInt($('#qty').val());
		if (quantity > 0)
		{
			$('#qty').val(quantity - 1);
		}
	});

});

// Modal On-click
$(document).on("click", ".open-AddFlavor", function ()
{
	var name = $(this).data('name');
	var flavorId = $(this).data('id');
	var imagepath = $(this).data('imagepath');
	$(".modal-body #flavorName").text(name);
	$(".modal-body #addToCart").attr('action', /add/ + flavorId);
	$(".modal-body #flavorImage").attr('src', imagepath).show();
});

// Cart Quantity Change
$(document).on("change", ".edit-quantity", function () // Value Change quantity update
{
	var id = $(this).data('id');
	var newQty = $(this).val();
	var oldQty = $(this).data('qty');
	$.post("/cart/" + id,
		{
			newQty: newQty,
			oldQty: oldQty
		});
	location.reload();
});

// Dropdown toggle
$('.dropdown-toggle').dropdown();