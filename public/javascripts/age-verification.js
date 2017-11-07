"use strict";
/*!
 * Simple Age Verification (https://github.com/Herudea/age-verification))
 */

var modal_content;
var modal_screen;
// Start Working ASAP.
$(document).ready(function ()
{
	av_legality_check();
});


var av_legality_check = function ()
{
	if ($.cookie('is_legal') === "yes")
	{
		// legal!
		// Do nothing?
	}
	else
	{
		av_showmodal();

		// Make sure the prompt stays in the middle.
		$(window).on('resize', av_positionPrompt);
	}
};

var av_showmodal = function ()
{
	modal_screen = $('<div id="modal_screen"></div>');
	modal_content = $('<div id="modal_content" style="display:none"></div>');
	var modal_content_wrapper = $('<div id="modal_content_wrapper" class="content_wrapper"></div>');
	var modal_regret_wrapper = $('<div id="modal_regret_wrapper" class="content_wrapper" style="display:none;"></div>');

	// Question Content
	// language=HTML
	var content_heading = $('<h2>Are you 18 or older?</h2>');
	// language=HTML
	var content_buttons = $('<nav class="d-flex justify-content-between"><div class="p-2"><a href="#nothing" class="av_btn av_go" rel="yes">Yes</a></div><div class="ml-auto p-2"><a href="#nothing" class="av_btn av_no" rel="no">No</a></div></nav>');
	// language=HTML
	var content_text = $('<p>You must verify that you are 18 years of age or older to enter this site.</p>');

	// Regret Content
	// language=HTML
	var regret_heading = $('<h2>We\'re Sorry!</h2>');
	// language=HTML
	var regret_buttons = $('<nav><small>I hit the wrong button!</small> <ul><li><a href="/" class="av_btn av_go" rel="yes">I\'m old enough!</a></li></ul></nav>');
	// language=HTML
	var regret_text = $('<p>You must be 18 years of age or older to enter this site.</p>');

	modal_content_wrapper.append(content_heading, content_buttons, content_text);
	modal_regret_wrapper.append(regret_heading, regret_buttons, regret_text);
	modal_content.append(modal_content_wrapper, modal_regret_wrapper);

	// Append the prompt to the end of the document
	$('body').append(modal_screen, modal_content);

	// Center the box
	av_positionPrompt();

	modal_content.find('a.av_btn').on('click', av_setCookie);
};

var av_setCookie = function (e)
{
	e.preventDefault();

	var is_legal = $(e.currentTarget).attr('rel');

	$.cookie('is_legal', is_legal, {
		expires: 365,
		path: '/'
	});

	if (is_legal === "yes")
	{
		av_closeModal();
		$(window).off('resize');
	}
	else
	{
		av_showRegret();
	}
};

var av_closeModal = function ()
{
	modal_content.fadeOut();
	modal_screen.fadeOut();
};

var av_showRegret = function ()
{
	modal_screen.addClass('nope');
	modal_content.find('#modal_content_wrapper').hide();
	modal_content.find('#modal_regret_wrapper').show();
};

var av_positionPrompt = function ()
{
	// language=JQuery-CSS
	var top = ($(window).outerHeight() - $('#modal_content').outerHeight()) / 2;
	// language=JQuery-CSS
	var left = ($(window).outerWidth() - $('#modal_content').outerWidth()) / 2;
	modal_content.css({
		'top': top,
		'left': left
	});

	if (modal_content.is(':hidden') && ($.cookie('is_legal') !== "yes"))
	{
		modal_content.fadeIn('slow')
	}
};