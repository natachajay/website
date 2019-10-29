// JavaScript Document
/* jshint browser: true */
/* globals $:false */

// SLIDING CARDS

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
    $("#filler").css("height", $(window).height()*2);
	/* Scroll to readjust filler etc. */
	window.scrollBy(0, 1);
	window.scrollBy(0, -1);
	
	/* Ensure the content fits */
	$(".sectionwrapper").each(function() {
		var totalHeight = 0;
		$(this).children().each(function(){
			totalHeight = totalHeight + $(this).outerHeight(true);
		});
		var min_height = Math.max($(window).height()*1.1, totalHeight);
		$(this).css("min-height", min_height);
	});
	resizeOverlayToCover();
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


function resizeOverlayToCover() {
	"use strict";
	$(".album_wrapper").each(function() {
		var overlay = $($(this).find(".overlay")[0]);
		var album = $($(this).find(".album")[0]);
		overlay.height(album.height());
	});
}

// PORTFOLIO

// PORTFOLIO: GLOBAL VARIABLES

let baseUrl = "https://natachajay.dk/wordpress/wp-json/wp/v2/";
let categoryList = [];

async function initiateProjectLoop() {
    await loadProjects();
}

async function loadProjects() {
    // Gather category info
    let url = baseUrl + "project?per_page=100";
    let jsonData = await fetch(url);
    let data = await jsonData.json();
    
    let loopTemplate = document.querySelector(".temp_portfolio");
    let mainElement = document.querySelector(".content_portfolio");
    data.forEach(function(item) {
        // Add to list of projects
        let klon = loopTemplate.cloneNode(true).content_portfolio;
        klon.querySelector(".grid_box").object.style.backgroundImage = item.cover_image.guid;
        // Add categoryID as data-category
        let categoryId = item.categories[0];
        klon.querySelector(".grid_box").dataset.categoryId = categoryId;
        // Add projectId
        klon.querySelector(".grid_box").dataset.projectId = item.id;
        // Add categoryId to the global variables list
        if (categoryList.indexOf(categoryId) === -1) {
            categoryList.push(categoryId)
        }
        mainElement.appendChild(klon);
    });
}