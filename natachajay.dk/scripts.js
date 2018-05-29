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
		console.log('test');
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
				console.log(childInView);
			}
		}
		else if (currentScrollTop < prevScrollTop && childInView > 0) {
			elem = $("#wrapper").children()[childInView-1];
			inView = isScrolledIntoView(elem);
			
			if (inView) {
				scrolluptrigger();
				console.log(childInView);	
			}
		}
		prevScrollTop = currentScrollTop;
	});
});


function initiate() {
	"use strict";
    //document.getElementById("div1").style.backgroundColor = "#49199A";
    document.getElementById("div2").style.backgroundColor = "#5C21A1";
	document.getElementById("div3").style.backgroundColor = "#6C229B";
    document.getElementById("div4").style.backgroundColor = "#912D9E";
    document.getElementById("div5").style.backgroundColor = "#E36795";
			
    $("#filler").css("height", $(window).height()*2);
	
	//updateHTML($("#div1"), "html_01.html");
	updateHTML($("#portfolio"), "html_02.html");
	updateHTML($("#about"), "html_03.html");
	updateHTML($("#booking"), "html_04.html");
	updateHTML($("#spare"), "html_05.html");
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






















