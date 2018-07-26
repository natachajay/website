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
    $(".thisisadiv").css("min-height", $(window).height()*1.1);
    $("#filler").css("height", $(window).height()*2);
}


function initiate() {
	"use strict";
	window.addEventListener('orientationchange', resizeSlidingCards);
	window.addEventListener('resize', resizeSlidingCards);
	
	/* Here comes the background colours! */
	
    document.getElementById("portfolio").style.backgroundColor = "#FFFFFF";
	document.getElementById("about").style.backgroundColor = "#FFFFFF";
    document.getElementById("booking").style.backgroundColor = "#FFFFFF";
    document.getElementById("spare").style.backgroundColor = "#FFFFFF";
			
    resizeSlidingCards();
	
	
	updateHTML($("#portfolio"), "/src/portfolio.html");
	updateHTML($("#about"), "/src/about.html");
	updateHTML($("#booking"), "/src/booking.html");
	updateHTML($("#spare"), "/src/spare.html");
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
    var newElem = $("#wrapper").children() [childInView];
    var divHeight = $("#filler").css("height") - $(newElem).css("height");
    $("#filler").css("height", divHeight);
    
    $(newElem).css("position", "fixed");
    childInView--;
}

function updateHTML(elem, file) {
	"use strict";
	fetch(file).then(function(res){
		res.text().then(function(text) {
			$(elem)[0].innerHTML = text;
		});
	});
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