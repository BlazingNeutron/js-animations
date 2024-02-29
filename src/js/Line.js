const minWidth = 10;
const maxWidth = 30;
const minHeight = 200;
const maxHeight = 600;
const minTTL = 100;
const maxTTL = 300;
const backgroundColor = "#000000";

function getRandomInt(min, max) {
	return Math.round(Math.random() * (max - min)) + min;
}

function fadeInOut(t, m) {
	let hm = 0.5 * m;
	return Math.abs((t + hm) % m - hm) / hm;
}

class Line {
	constructor(ctx) {
		this.x = getRandomInt(0, ctx.canvas.width);
		this.y = ctx.canvas.height / 2 + minHeight;
		this.width = getRandomInt(minWidth, maxWidth);
		this.height = getRandomInt(minHeight, maxHeight);
		this.hue = getRandomInt(120, 180);
		this.ttl = getRandomInt(minTTL, maxTTL);
		this.life = 0;
        this.ctx = ctx;
        this.canvas = ctx.canvas;
	}
	draw() {
		let gradient;
		gradient = this.ctx.createLinearGradient(this.x, this.y - this.height, this.x, this.y);
		gradient.addColorStop(0, `hsla(${this.hue}, 100%, 65%, 0)`);
		gradient.addColorStop(0.5, `hsla(${this.hue}, 100%, 65%, ${fadeInOut(this.life, this.ttl)})`);
		gradient.addColorStop(1, `hsla(${this.hue}, 100%, 65%, 0)`);

		this.ctx.save();
		this.ctx.beginPath();
		this.ctx.strokeStyle = gradient;
		this.ctx.lineWidth = this.width;
		this.ctx.moveTo(this.x, this.y - this.height);
		this.ctx.lineTo(this.x, this.y);
		this.ctx.stroke();
		this.ctx.closePath();
		this.ctx.restore();
	}
	update() {
		this.life++;
		if (this.life > this.ttl) {
			this.life = 0;
			this.x = getRandomInt(0, this.canvas.width);
			this.width = getRandomInt(minWidth, maxWidth);
		}
	}
}
module.exports = Line;