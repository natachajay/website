"use strict"
var time_remaining;
var points;
var goal;
var health;
var pinhead_health;
var gameover;
var gamewon;

/**

clickStart //Drop start-knappen - brug også til Igorina win-drop, uden klik

// getelembyid(start).addeventlist('click') =         
//     this.classList.add('drop');
// });
**/


function showStart () {
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

function hideStart () {
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

function showGame () {
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
	hideStart();
	showGame();
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
		
		var minutes = Math.floor((time_remaining % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((time_remaining % (1000 * 60)) / 1000);
		console.log(minutes + ':' + seconds);
		console.log('points: ' + points);
		console.log('health: ' + health);
		if (time_remaining <= 0){
			clearInterval(x);
			defeat();
		}
		if (gameover) {
			clearInterval(x);
		}
	},1000);
}

function initiateMeteors() {
	"use strict"
	var meteor_small = document.getElementById("meteor_small");
	var meteor_large = document.getElementById("meteor_large");
	var meteor_giant = document.getElementById("meteor_giant");
	meteor_small.classList.remove('attack_slow');
	meteor_large.classList.remove('attack_fast');
	meteor_giant.classList.remove('attack_faster');
	meteor_small.classList.add('attack_slow');
	meteor_large.classList.add('attack_fast');
	meteor_giant.classList.add('attack_faster');
}

function initiateGas() {
	"use strict"
	var gas_small = document.getElementById("gas_cloud_small");
	var gas_large = document.getElementById("gas_cloud_large");
	gas_small.classList.remove('attack_slow');
	gas_large.classList.remove('attack_fast');
	gas_small.classList.add('attack_slow');
	gas_large.classList.add('attack_fast');
}

function initiateSunburst() {
	"use strict"
	var sunburst = document.getElementById("sunburst");
	sunburst.classList.remove('sunburst_drop');
	sunburst.classList.add('sunburst_drop');
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
