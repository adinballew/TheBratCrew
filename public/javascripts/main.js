// Carousel Controller
$('#carouselController').carousel();

// Modal On-click
$(document).on("click", ".open-AddFlavor", function ()
{
	let flavorId = $(this).data('id');
	let name = $(this).data('name');
	let imagepath = $(this).data('imagepath');
	$(".modal-body #flavorId").val(flavorId);
	$(".modal-body #flavorName").text(name);
	$(".modal-body #flavorImage").attr('src', imagepath).show();
});

