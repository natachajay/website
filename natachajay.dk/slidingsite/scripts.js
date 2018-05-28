// JavaScript Document
/* jshint browser: true */
/* globals $:false */

var divOfInt;
var prevScrollTop;

$("document").ready(function() {
	divOfInt = 0;
	prevScrollTop = $(this).scrollTop();
	
	initiate();
	
	$(window).scroll(function(event) {
		var currentScrollTop = $(this).scrollTop();
		
		if (currentScrollTop == prevScrollTop) {
			return;
		}
		if (currentScrollTop > prevScrollTop) {
			var elem = $("#wrapper").children()[divOfInt];
			var inView = isScrolledIntoView(elem);
			
			if (!inView) {
				scrolldowntrigger();	
			}
		}
		else if (currentScrollTop < prevScrollTop) {
			var elem = $("#wrapper").children()[divOfInt-1];
			var inView = isScrolledIntoView(elem);
			
			if (inView) {
				scrolluptrigger();	
			}
		}
		prevScrollTop = currentScrollTop;
	})
})


function initiate() {
    document.getElementById("div1").style.backgroundColor = "#49199A";
    document.getElementById("div2").style.backgroundColor = "#5C21A1";
	document.getElementById("div3").style.backgroundColor = "#6C229B";
    document.getElementById("div4").style.backgroundColor = "#912D9E";
    document.getElementById("div5").style.backgroundColor = "#E36795";
			
    $("#filler").css("height", $(window).height()+1);
	
	updateHTML($("#div1"), "html_01.html");
	updateHTML($("#div2"), "html_02.html");
	updateHTML($("#div3"), "html_03.html");
	updateHTML($("#div4"), "html_04.html");
	updateHTML($("#div5"), "html_05.html");
}

function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

	return ((elemTop <= docViewBottom) && (elemBottom >= docViewTop));
}

function scrolldowntrigger() {
    divOfInt++;
    var newElem = $("#wrapper").children() [divOfInt];
    $(newElem).css("position", "relative");
	if (divOfInt == $("#wrapper").children().length - 1) {
		$("#filler").css("display", "none");
	}
}

function scrolluptrigger() {
	$("#filler").css("display", "block");
	if (divOfInt == 0) {
		return;
	}
    var newElem = $("#wrapper").children() [divOfInt];
    var divHeight = $("#filler").css("height") - $(newElem).css("height");
    $("#filler").css("height", divHeight);
    
    $(newElem).css("position", "fixed");
    divOfInt--;
}

function updateHTML(elem, file) {
	fetch(file).then(function(res){
		res.text().then(function(text) {
			$(elem)[0].innerHTML = text;
		})
	})
}