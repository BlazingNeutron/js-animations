const SimpleAnimator = require('../../src/js/simpleAnimator');
const Wavey = require('../../src/js/Wavey');

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
	dot = new Wavey(simpleAnimator.ctx.a);
	simpleAnimator.objects = dot;
}

// Runs automatically when in browser
window.addEventListener('load', browserInit);
window.addEventListener("resize", () => simpleAnimator.resizeReset());

module.exports = setup;