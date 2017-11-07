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
	var description = $(this).data('description');
	$(".modal-body #flavorName").text(name);
	$(".modal-body #addToCart").attr('action', /add/ + flavorId);
	$(".modal-body #flavorImage").attr('src', imagepath).show();
	$(".modal-body #flavorDescription").text(description);
});

// Cart Quantity Change
$(document).on("change", ".edit-quantity", function () // Value Change quantity update
{
	var id = $(this).data('id');
	var newQty = $(this).val();
	var oldQty = $(this).data('qty');
	if ($.isNumeric(newQty))
	{
		if (newQty === '0')
		{
			$.get("/remove/" + id);
			history.go(0);
		}
		else
		{
			$.post("/cart/" + id,
				{
					newQty: newQty,
					oldQty: oldQty
				});
			history.go(0);
		}
	}
});

// Dropdown toggle
$('.dropdown-toggle').dropdown();