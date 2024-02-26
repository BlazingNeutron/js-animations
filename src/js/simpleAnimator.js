
const SimpleAnimator = function () {
    return {
        container: null,
        canvas: null,
        ctx: null,
        objects: null,

        startAnimationLoop() {
            this.animationLoop();
        },

        createCanvas() {
            this.container = document.querySelector('.content');
            this.canvas = {
                a: document.createElement('canvas'),
                b: document.createElement('canvas')
            };
            this.canvas.b.style = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            `;
            this.container.appendChild(this.canvas.b);
            this.ctx = {
                a: this.canvas.a.getContext('2d'),
                b: this.canvas.b.getContext('2d')
            };
            this.resizeReset();
        },

        updateObjectAndSwapFrame() {
            this.ctx.a.clearRect(0, 0, this.canvas.a.width, this.canvas.a.height);
            this.ctx.b.fillStyle = "#000";
            this.ctx.b.fillRect(0, 0, this.canvas.b.width, this.canvas.b.height);

            if (Array.isArray(this.objects)) {
                for (var i = 0; i < this.objects.length; i++) {
                    this.objects[i].update();
                    this.objects[i].draw();
                }
            } else {
                this.objects.update();
                this.objects.draw();
            }

            this.ctx.b.save();
            this.ctx.a.globalCompositeOperation = "lighter";
            this.ctx.b.drawImage(this.canvas.a, 0, 0);
            this.ctx.b.restore();
        },

        animationLoop() {
            this.updateObjectAndSwapFrame();
            requestAnimationFrame(() => this.animationLoop());
        },

        resizeReset() {
            this.canvas.a.width = window.innerWidth;
            this.canvas.a.height = window.innerHeight;
        
            this.ctx.a.drawImage(this.canvas.b, 0, 0);
        
            this.canvas.b.width = window.innerWidth;
            this.canvas.b.height = window.innerHeight;
        
            this.ctx.b.drawImage(this.canvas.a, 0, 0);
        }
    }
}

module.exports = SimpleAnimator;