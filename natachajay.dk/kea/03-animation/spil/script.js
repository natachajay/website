"use strict"
var time_remaining;
var points;
var goal;
var health;
var pinhead_health;
var gameover;
var gamewon;


function showStart() {
	"use strict"
	// Elements to be shown on titlescreen
	var menu_bg = document.getElementById("menu_background");
	var logo = document.getElementById("logo");
	var start_btn = document.getElementById("start");
	var settings_btn = document.getElementById("settings_button");
	showElement(menu_bg);
	showElement(logo);
	showElement(start_btn);
	showElement(settings_btn);
}

function hideStart() {
	"use strict"
	// Elements to be hidden on titlescreen
	var menu_bg = document.getElementById("menu_background");
	var logo = document.getElementById("logo");
	var start_btn = document.getElementById("start");
	var settings_btn = document.getElementById("settings_button");
	hideElement(menu_bg);
	hideElement(logo);
	hideElement(start_btn);
	hideElement(settings_btn);
}

function showSettings() {
	"use strict"
	var settings = document.getElementById("settings");
	var mute_music = document.getElementById("mute_music");
	var mute_effects = document.getElementById("mute_effects");
	var unmute_music = document.getElementById("unmute_music");
	var unmute_effects = document.getElementById("unmute_effects");
	var close_btn = document.getElementById("close");
	hideStart();
	showElement(settings);
	showElement(close_btn);
	if (document.querySelector("#music").muted) {
		showElement(unmute_music);
	}
	else {
		showElement(mute_music);
	}
	if (document.querySelector(".effects").muted) {
		showElement(unmute_effects);
	}
	else {
		showElement(mute_effects);
	}
}

function hideSettings() {
	"use strict"
	var settings = document.getElementById("settings");
	var mute_music = document.getElementById("mute_music");
	var mute_effects = document.getElementById("mute_effects");
	var unmute_music = document.getElementById("unmute_music");
	var unmute_effects = document.getElementById("unmute_effects");
	var close_btn = document.getElementById("close");
	hideElement(settings);
	hideElement(mute_music);
	hideElement(mute_effects);
	hideElement(unmute_music);
	hideElement(unmute_effects);
	hideElement(close_btn);
	showStart();
}

function unmuteMusic() {
	"use strict"
	document.querySelector("#music").muted = false;
	var unmute_music = document.getElementById("unmute_music");
	var mute_music = document.getElementById("mute_music");
	hideElement(unmute_music);
	showElement(mute_music);
}

function muteMusic() {
	"use strict"
	document.querySelector("#music").muted = true;
	var unmute_music = document.getElementById("unmute_music");
	var mute_music = document.getElementById("mute_music");
	hideElement(mute_music);
	showElement(unmute_music);
}

function showGame() {
	"use strict"
	// Game elements to be shown
	var game_bg = document.getElementById("game_background");
	var earth = document.getElementById("earth");
	var igorina_back = document.getElementById("igorina_back");
	var meteor_small = document.getElementById("meteor_small");
	var meteor_large = document.getElementById("meteor_large");
	var meteor_giant = document.getElementById("meteor_giant");
	var gas_small = document.getElementById("gas_cloud_small");
	var gas_large = document.getElementById("gas_cloud_large");
	var sunburst = document.getElementById("sunburst");
	var game_ui = document.getElementById("game_ui");
	var energy = document.getElementById("energy");
	var time = document.getElementById("time");
	showElement(game_bg);
	showElement(earth);
	showElement(igorina_back);
	showElement(meteor_small);
	showElement(meteor_large);
	showElement(meteor_giant);
	showElement(gas_small);
	showElement(gas_large);
	showElement(sunburst);
	showElement(game_ui);
	showElement(energy);
	showElement(time);
}

function hideGame () {
	"use strict"
	// Game elements to be hidden
	var game_bg = document.getElementById("game_background");
	var earth = document.getElementById("earth");
	var igorina_back = document.getElementById("igorina_back");
	var pinhead_front = document.getElementById("pinhead_front");
	var meteor_small = document.getElementById("meteor_small");
	var meteor_large = document.getElementById("meteor_large");
	var meteor_giant = document.getElementById("meteor_giant");
	var gas_small = document.getElementById("gas_cloud_small");
	var gas_large = document.getElementById("gas_cloud_large");
	var sunburst = document.getElementById("sunburst");
	var game_ui = document.getElementById("game_ui");
	var energy = document.getElementById("energy");
	var time = document.getElementById("time");
	hideElement(game_bg);
	hideElement(earth);
	hideElement(igorina_back);
	hideElement(pinhead_front);
	hideElement(meteor_small);
	hideElement(meteor_large);
	hideElement(meteor_giant);
	hideElement(gas_small);
	hideElement(gas_large);
	hideElement(sunburst);
	hideElement(game_ui);
	hideElement(energy);
	hideElement(time);
}

function startGame() {
	"use strict"
	points = 0;
	goal = 100;
	gameover = false;
	gamewon = false;
	health = 10;
	pinhead_health = 12;
	// Initiating animations and starting the game
	dropStart();
	setTimeout(function() {
		hideStart();
		showGame();
	}, 1200);
	initiateMeteors();
	initiateGas();
	initiateSunburst();
	initiateTimer();
}

function showElement(element) {
	"use strict"
	element.classList.remove('hide');
	element.classList.add('show');
}

function hideElement(element) {
	"use strict"
	element.classList.remove('show');
	element.classList.add('hide');
}

function initiateTimer() {
	"use strict"
	var d = new Date();
	d.setMinutes(d.getMinutes() + 5);
	var timer = d.getTime();
	var x = setInterval(function(){
		var now = new Date().getTime();
		var time_remaining = timer - now;
		if (time_remaining <= 0){
			clearInterval(x);
			defeat();
		}
		if (gameover) {
			clearInterval(x);
		}
		showTime(time_remaining);
		showPoints();
		showHealth();
	},1000);
}

function showTime(time_remaining) {
	"use strict"
	var time_indicator = document.getElementById("time_amount");
	var minutes = Math.floor((time_remaining % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((time_remaining % (1000 * 60)) / 1000);
	console.log(minutes + ':' + seconds);
	time_indicator.innerText = minutes + ':' + seconds;
}

function showPoints() {
	"use strict"
	console.log('points: ' + points);
	var point_indicator = document.getElementById("point_amount");
	point_indicator.innerText = points;
}

function showHealth() {
	"use strict"
	console.log('health: ' + health);
	var energy_indicator = document.getElementById("energy_amount");
	energy_indicator.innerText = "x" + health;
}

// GAME ELEMENTS

function initiateMeteors() {
	"use strict"
	var meteor_small = document.getElementById("meteor_small");
	var meteor_large = document.getElementById("meteor_large");
	var meteor_giant = document.getElementById("meteor_giant");
	meteor_small.classList.remove('attack');
	meteor_large.classList.remove('attack');
	meteor_giant.classList.remove('attack');
	meteor_small.classList.remove('slow');
	meteor_large.classList.remove('fast');
	meteor_giant.classList.remove('faster');
	meteor_small.classList.add('attack');
	meteor_large.classList.add('attack');
	meteor_giant.classList.add('attack');
	meteor_small.classList.add('slow');
	meteor_large.classList.add('fast');
	meteor_giant.classList.add('faster');
}

	function smashMeteor(element, value) {
		"use strict"
		meteorSound();
		element.classList.remove('attack');
		addPoints(value);
		setTimeout(function() {
			replaceElement(element);
			element.classList.add('attack');
		}, 1000);
	}

		function meteorSound() {
			"use strict"
			document.querySelector("#meteor_effect").play;
		}

function initiateGas() {
	"use strict"
	var gas_small = document.getElementById("gas_cloud_small");
	var gas_large = document.getElementById("gas_cloud_large");
	gas_small.classList.remove('attack');
	gas_large.classList.remove('attack');
	gas_small.classList.remove('slow');
	gas_large.classList.remove('fast');
	gas_small.classList.add('attack');
	gas_large.classList.add('attack');
	gas_small.classList.add('slow');
	gas_large.classList.add('fast');
}

	function oopsGas(element, value) {
			"use strict"
			element.classList.remove('attack');
			damage(value);
			setTimeout(function() {
				replaceElement(element);
				element.classList.add('attack');
			}, 1000);
		}

		function gasSound() {
			
		}

function initiateSunburst() {
	"use strict"
	var sunburst = document.getElementById("sunburst");
	sunburst.classList.remove('sunburst_drop');
	sunburst.classList.add('sunburst_drop');
}

	function giveLife(element, value) {
			"use strict"
			element.classList.remove('sunburst_drop');
			heal(value);
			setTimeout(function() {
				replaceElement(element);
				element.classList.add('sunburst_drop');
			}, 1000);
		}

		function burstSound() {
			
		}

function addPoints(value) {
	"use strict"
	points += value;
	if (points >= goal) {
		initiatePinhead();
	}
}

function heal(value) {
	"use strict"
	health += value;
}

function damage(value) {
	"use strict"
	health -= value;
	if (health <= 0) {
		defeat();
	}
}

function replaceElement(element) {
	"use strict"
	var position = Math.floor(Math.random() * 80) + 10;
	element.style.left = position + "vw";
}

// PINHEAD

function initiatePinhead() {
	"use strict"
	var pinhead_front = document.getElementById("pinhead_front");
	showElement(pinhead_front);
}

	function attackPinhead() {
		"use strict"
		console.log('Attack Pinhead!');
		damagePinhead(1);
		damage(1);
	}

		function damagePinhead(value) {
			"use strict"
			pinhead_health -= value;
			if (pinhead_health <= 0) {
				victory();
			}
		}

function pulse() {
	
}

// END-GAME

function defeat() {
	"use strict"
	if (gameover) {
		return;
	}
	gameover = true;
	showGameOver();
	hideGame();
}

	function showGameOver() {
		"use strict"
		var gameover = document.getElementById('gameover');
		var gameover_play_again = document.getElementById('gameover_play_again');
		showElement(gameover);
		showElement(gameover_play_again);
	}

		function hideGameOver() {
			"use strict"
			var gameover = document.getElementById('gameover');
			var gameover_play_again = document.getElementById('gameover_play_again');
			hideElement(gameover);
			hideElement(gameover_play_again);
		}

function victory() {
	"use strict"
	if (gameover) {
		return;
	}
	gamewon = true;
	gameover = true;
	showLevelComplete();
	hideGame();
}

	function showLevelComplete() {
		"use strict"
		var levelcomplete = document.getElementById('levelcomplete');
		var levelcomplete_play_again = document.getElementById('levelcomplete_play_again');
		showElement(levelcomplete);
		showElement(levelcomplete_play_again);
		hideGame();
	}

		function hideLevelComplete() {
			"use strict"
			var levelcomplete = document.getElementById('levelcomplete');
			var levelcomplete_play_again = document.getElementById('levelcomplete_play_again');
			hideElement(levelcomplete);
			hideElement(levelcomplete_play_again);
		}

function resetGame() {
	"use strict"
	if (!gamewon) {
		hideGameOver();
	}
	else {
		hideLevelComplete();
	}
	startGame();
}

// ANIMATION

function startAnimation(element) {
	element.classList.remove("pause_animation");
	element.classList.add("start_animation");
}

	function pauseAnimation(element) {
		element.classList.remove("start_animation");
		element.classList.add("pause_animation");
	}

function dropStart() {
	var start_btn = document.getElementById("start")
	start_btn.classList.add('drop');
}

// AUDIO

