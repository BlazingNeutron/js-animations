let container;
let canvas;
let ctx;
let center;

function setup() {
	createCanvas();
}

function createCanvas() {
  container = document.querySelector('.content');
	canvas = {
		a: document.createElement('canvas'),
		b: document.createElement('canvas')
	};
	canvas.b.style = `
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	`;
	container.appendChild(canvas.b);
	ctx = {
		a: canvas.a.getContext('2d'),
		b: canvas.b.getContext('2d')
  };
  center = [];
}

window.addEventListener('load', setup);

module.exports = setup;