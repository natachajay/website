// JavaScript Document
/* jshint browser: true */
/* globals $:false */

var childInView;
var prevScrollTop;

$("document").ready(function() {
	"use strict";
	childInView = 0;
	prevScrollTop = $(this).scrollTop();
	
	initiate();
	
	
    $(".menuitems").click(function() {
		scrollToElem($(this).attr('href'));
		return false;
    });
	
	$(window).scroll(function() {
		var elem, inView;
		var currentScrollTop = $(this).scrollTop();
		
		if (currentScrollTop === prevScrollTop) {
			return;
		}
		if (currentScrollTop > prevScrollTop) {
			elem = $("#wrapper").children()[childInView];
			inView = isScrolledIntoView(elem);
			
			if (!inView) {
				scrolldowntrigger();
			}
		}
		else if (currentScrollTop < prevScrollTop && childInView > 0) {
			elem = $("#wrapper").children()[childInView-1];
			inView = isScrolledIntoView(elem);
			
			if (inView) {
				scrolluptrigger();
			}
		}
		prevScrollTop = currentScrollTop;
	});
});

function resizeSlidingCards() {
	"use strict";
	/* window-height * 1.1 to ensure it fills the whole screen when addressbar is gone */
    $(".thisisadiv").css("min-height", $(window).height()*1.1);
    $("#filler").css("height", $(window).height()*2);
	/* Scroll to readjust filler etc. */
	window.scrollBy(0, 1);
	window.scrollBy(0, -1);
}


function initiate() {
	"use strict";
	window.addEventListener('orientationchange', resizeSlidingCards);
	window.addEventListener('resize', resizeSlidingCards);
    resizeSlidingCards();
}

function isScrolledIntoView(elem) {
	"use strict";
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

	return ((elemTop <= docViewBottom) && (elemBottom >= docViewTop));
}

function scrolldowntrigger() {
	"use strict";
	if (childInView === $("#wrapper").children().length - 1) {
		return;
	}
    childInView++;
    var newElem = $("#wrapper").children() [childInView];
    $(newElem).css("position", "relative");
	determineTextColour(newElem);
	if (childInView === $("#wrapper").children().length - 1) {
		$("#filler").css("display", "none");
	}
}

function scrolluptrigger() {
	"use strict";
	$("#filler").css("display", "block");
	if (childInView === 0) {
		return;
	}
    var oldElem = $("#wrapper").children() [childInView];
    var divHeight = $("#filler").css("height") - $(oldElem).css("height");
    $("#filler").css("height", divHeight);
    
    $(oldElem).css("position", "fixed");
    childInView--;
    var newElem = $("#wrapper").children() [childInView];
	determineTextColour(newElem);
}

function scrollToElem(elemId) {
	"use strict";
	var currentScrollTop = $(window).scrollTop();
	var child = $("#wrapper " + elemId);
	var childNo = Array.from(child[0].parentNode.children).indexOf(child[0]);
	
	if (childNo > childInView) {
		var distance = 0;
		for (var i = 0; i < childNo; i++) {
			distance += $(child.parent().children()[i])[0].offsetHeight;
		}
		$('html, body').animate({
			scrollTop: distance
		}, 500);
	}
	else {
		$('html, body').animate({
			scrollTop: child.offset().top
		}, 500);	
	}
	prevScrollTop = currentScrollTop;
}

function determineTextColour(current_card) {
	"use strict";
	if ($(current_card).classList.contains("dark")) {
		$(".menuitems").css('color', 'white');
	}
	else {
		$(".menuitems").css('color', '#49454D');
	}
}