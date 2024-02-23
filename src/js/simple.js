const SimpleAnimator = require('../../src/js/simpleAnimator');
const DotDrawObject = require('../../src/js/simpleObject');

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
	dot = new DotDrawObject(simpleAnimator.ctx.a);
	simpleAnimator.objects = dot;
}

// Runs automatically when in browser
window.addEventListener('load', browserInit);

module.exports = setup;