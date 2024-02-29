const SimpleAnimator = require('../../src/js/simpleAnimator');
const WaveyDots = require('../../src/js/WaveyDots');

let simpleAnimator = new SimpleAnimator();

function browserInit() {
	setup();
	initObject();
	simpleAnimator.startAnimationLoop();
}

function setup() {
	simpleAnimator.createCanvas();
}

function initObject() {
	dot = new WaveyDots(simpleAnimator.ctx.a);
	simpleAnimator.objects = dot;
}

// Runs automatically when in browser
window.addEventListener('load', browserInit);
window.addEventListener("resize", () => simpleAnimator.resizeReset());

module.exports = setup;