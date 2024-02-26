class SineWave {
	constructor(ctx) {
		this.x = 10;
		this.y = 60;
		this.width = 10;
		this.height = 10;
        this.ctx = ctx;
        this.step = -4;
	}
    plotSine(ctx, xOffset, yOffset) {
        var width = ctx.canvas.width;
        var height = ctx.canvas.height;
        ctx.beginPath();

        var x = 0;
        var y = 0;
        var amplitude = 40;
        var frequency = 50;
        y = height / 2 + amplitude * Math.sin((x + xOffset) / frequency);
        ctx.moveTo(x, y);
        let gradient;
        gradient = ctx.createLinearGradient(0, y-50, width, y+50);
        gradient.addColorStop(0, "red");
        gradient.addColorStop(0.1, "purple");
        gradient.addColorStop(0.5, "green");
        gradient.addColorStop(1, "blue");
        ctx.strokeStyle = gradient;
        while (x < width) {
            y = height / 2 + amplitude * Math.sin((x + xOffset) / frequency);
  
            ctx.lineTo(x, y);
            
            x++;

        }
        ctx.stroke();
        ctx.save();

        ctx.stroke();
        ctx.restore();
    }
    draw() {
        var context = this.ctx;

        context.clearRect(0, 0, 1131, 913);
        context.save();

        this.plotSine(context, this.step, 50);
        context.restore();
    }
    getRandomInt(min, max) {
        return Math.round(Math.random() * (max - min)) + min;
    }
    update() {
        this.step += 1;        
    }
}

module.exports = SineWave;