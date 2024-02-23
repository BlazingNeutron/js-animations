class DotDrawObject {
	constructor(ctx) {
		this.x = 0;
		this.y = 60;
		this.width = 10;
		this.height = 10;
        this.ctx = ctx;
	}

	draw() {
		this.ctx.save();
		this.ctx.beginPath();
		this.ctx.strokeStyle = "#fff";
		this.ctx.lineWidth = this.width;
		this.ctx.moveTo(this.x, this.y - this.height);
		this.ctx.lineTo(this.x, this.y);
		this.ctx.stroke();
        this.ctx.closePath();
		this.ctx.restore();
	}
	update() {
		this.x++;
	}
}

module.exports = DotDrawObject;