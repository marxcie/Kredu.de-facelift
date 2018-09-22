(function ($) {
	"use strict";

	// Custom navbar collapsing on scroll
	$(window).scroll(function () {
		if ($(".navbar").offset().top > 150) {
			$(".navbar-fixed-top").addClass("top-nav-collapse");
		} else {
			$(".navbar-fixed-top").removeClass("top-nav-collapse");
		}
	});

	// WOW-plug-in customisation
	var wow = new WOW(
		{
			animateClass: 'animated',
			mobile: false, // disable wow-effects on mobile devices
			offset: 100,

			//callback: function (box) {
			//	console.log("WOW: animating <" + box.tagName.toLowerCase() + ">")
			//}
		}
	);
	wow.init();

}(jQuery));
