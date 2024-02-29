class WaveyDots {
    waveWidth = 1100;
    waveHeight = 100;                   // Position from the top of container
    waveDelta = 80;                     // Wave amplitude
    speed = 0.2;                        // Wave animation speed
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
    getBezierXY(t, sx, sy, cp1x, cp1y, cp2x, cp2y, ex, ey) {
        return {
            x: Math.pow(1-t,3) * sx + 3 * t * Math.pow(1 - t, 2) * cp1x 
                + 3 * t * t * (1 - t) * cp2x + t * t * t * ex,
            y: Math.pow(1-t,3) * sy + 3 * t * Math.pow(1 - t, 2) * cp1y 
                + 3 * t * t * (1 - t) * cp2y + t * t * t * ey
        };
    }
    draw() {
        this.waveWidth = this.ctx.canvas.width;
        this.waveHeight = (this.ctx.canvas.height/3)*2;
        var factor = this.totalTime * Math.PI;
        var points = this.calculateWavePoints(factor);
        var cp0 = {
            x: (points[1].x - points[0].x) / 2,
            y: (points[1].y - points[0].y) + points[0].y + (points[1].y - points[0].y)
        };

        var context = this.ctx;
        
        context.save();
        var bgGradient = context.createRadialGradient(context.canvas.width/2, context.canvas.height/4, 500, context.canvas.width/2, context.canvas.height/4, 1000);
        bgGradient.addColorStop(0, "#3d414d");
        bgGradient.addColorStop(1, "#1e1c2f");
        context.fillStyle = bgGradient;
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        context.restore();

        context.beginPath();
        

        let gradient;
        gradient = this.ctx.createLinearGradient(0, 50, this.waveWidth, 150);
        gradient.addColorStop(0, "#3a29b0");
        gradient.addColorStop(0.5, "#29e8ff");
        gradient.addColorStop(1, "#9421c2");
        context.fillStyle = gradient;      
        //context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        
        
        var pointB = this.getBezierXY(0.1, points[0].x, points[0].y, cp0.x, cp0.y, cp0.x, cp0.y, points[1].x, points[1].y);
        context.fillRect(pointB.x, pointB.y + 10, 10, 10);
        pointB = this.getBezierXY(0.4, points[0].x, points[0].y, cp0.x, cp0.y, cp0.x, cp0.y, points[1].x, points[1].y);
        context.fillRect(pointB.x, pointB.y - 10, 10, 10);
        pointB = this.getBezierXY(0.8, points[0].x, points[0].y, cp0.x, cp0.y, cp0.x, cp0.y, points[1].x, points[1].y);
        context.fillRect(pointB.x, pointB.y - 20, 10, 10);
        pointB = this.getBezierXY(1.0, points[0].x, points[0].y, cp0.x, cp0.y, cp0.x, cp0.y, points[1].x, points[1].y);
        context.fillRect(pointB.x, pointB.y + 20, 10, 10);

        context.moveTo(points[0].x, points[0].y);
        context.bezierCurveTo(cp0.x, cp0.y, cp0.x, cp0.y, points[1].x, points[1].y);

        var prevCp = cp0;

        for (var i = 1; i < points.length - 1; i++) {
            var cp1 = {
                x: (points[i].x - prevCp.x) + points[i].x,
                y: (points[i].y - prevCp.y) + points[i].y
            };

            context.bezierCurveTo(cp1.x, cp1.y, cp1.x, cp1.y, points[i + 1].x, points[i + 1].y);

            var pointB = this.getBezierXY(0.1, points[i].x, points[i].y, cp1.x, cp1.y, cp1.x, cp1.y, points[i+1].x, points[i+1].y);
            context.fillRect(pointB.x, pointB.y + 10, 10, 10);
            pointB = this.getBezierXY(0.4, points[i].x, points[i].y, cp1.x, cp1.y, cp1.x, cp1.y, points[i+1].x, points[i+1].y);
            context.fillRect(pointB.x, pointB.y - 10, 10, 10);
            pointB = this.getBezierXY(0.8, points[i].x, points[i].y, cp1.x, cp1.y, cp1.x, cp1.y, points[i+1].x, points[i+1].y);
            context.fillRect(pointB.x, pointB.y - 20, 10, 10);
            pointB = this.getBezierXY(1.0, points[i].x, points[i].y, cp1.x, cp1.y, cp1.x, cp1.y, points[i+1].x, points[i+1].y);
            context.fillRect(pointB.x, pointB.y + 20, 10, 10);

            prevCp = cp1;
        };
        context.strokeStyle = gradient;
        context.lineWidth = 10;
        context.stroke();

//        context.beginPath();
//        getBezierXY
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

module.exports = WaveyDots;