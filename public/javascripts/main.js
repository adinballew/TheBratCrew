// Carousel Controller
$('#carouselController').carousel();

// Modal On-click
$(document).on("click", ".open-AddFlavor", function ()
{
	let name = $(this).data('name');
	let flavorId = $(this).data('id');
	let imagepath = $(this).data('imagepath');
	$(".modal-body #flavorName").text(name);
	$(".modal-body #flavorId").val(flavorId);
	$(".modal-body #flavorImage").attr('src', imagepath).show();
});

// Qty Select
$(document).ready(function ()
{
	let quantity = 0;
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