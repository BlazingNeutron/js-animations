class Wavey {
    waveWidth = 1100;
    waveHeight = 100;                   // Position from the top of container
    waveDelta = 40;                     // Wave amplitude
    speed = 0.3;                        // Wave animation speed
    wavePoints = 3;                     // How many point will be used to compute our wave

    lastUpdate = 0;
    totalTime = 0;

    constructor(ctx) {
        this.ctx = ctx;
    }
    calculateWavePoints(factor) {
        var points = [];

        for (var i = 0; i <= this.wavePoints; i++) {
            var x = i / this.wavePoints * this.waveWidth;
            var sinSeed = (factor + (i + i % this.wavePoints)) * this.speed * 100;
            var sinHeight = Math.sin(sinSeed / 100) * this.waveDelta;
            var yPos = Math.sin(sinSeed / 100) * sinHeight + this.waveHeight;
            points.push({ x: x, y: yPos });
        }

        return points;
    }
    draw() {
        this.waveWidth = this.ctx.canvas.width;
        var factor = this.totalTime * Math.PI;
        var points = this.calculateWavePoints(factor);
        var cp0 = {
            x: (points[1].x - points[0].x) / 2,
            y: (points[1].y - points[0].y) + points[0].y + (points[1].y - points[0].y)
        };

        var context = this.ctx;
        context.beginPath();
        context.save();
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
        
        context.moveTo(points[0].x, points[0].y);
        context.bezierCurveTo(cp0.x, cp0.y, cp0.x, cp0.y, points[1].x, points[1].y);

        var prevCp = cp0;

        for (var i = 1; i < points.length - 1; i++) {
            var cp1 = {
                x: (points[i].x - prevCp.x) + points[i].x,
                y: (points[i].y - prevCp.y) + points[i].y
            };

            context.bezierCurveTo(cp1.x, cp1.y, cp1.x, cp1.y, points[i + 1].x, points[i + 1].y);
            prevCp = cp1;
        };
        let gradient;
        gradient = this.ctx.createLinearGradient(0, 50, this.waveWidth, 150);
        gradient.addColorStop(0, "red");
        gradient.addColorStop(0.1, "purple");
        gradient.addColorStop(0.5, "green");
        gradient.addColorStop(1, "blue");
        context.strokeStyle = gradient;
        context.lineWidth = 10;
        context.stroke();
        context.restore();
    }

    update() {
        var now = window.Date.now();

        if (this.lastUpdate) {
            var elapsed = (now - this.lastUpdate) / 1000;
            this.lastUpdate = now;
            this.totalTime += elapsed;
        } else {
            this.lastUpdate = now;
        }
    }
}

module.exports = Wavey;