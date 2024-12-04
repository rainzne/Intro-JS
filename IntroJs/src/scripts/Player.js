class Player {
    constructor(x, y, color, controls) {
        this.x = x;
        this.y = y;
        this.size = 20;
        this.color = color;
        this.speed = 2;
        this.controls = controls;
        this.dx = 0;
        this.dy = 0;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    move() {
        this.x += this.dx * this.speed;
        this.y += this.dy * this.speed;

        // Garder le joueur dans les limites du canvas
        this.x = Math.max(0, Math.min(canvas.width - this.size, this.x));
        this.y = Math.max(0, Math.min(canvas.height - this.size, this.y));
    }

    handleInput(key, isDown) {
        if (key === this.controls.up) this.dy = isDown ? -this.speed : 0;
        if (key === this.controls.down) this.dy = isDown ? this.speed : 0;
        if (key === this.controls.left) this.dx = isDown ? -this.speed : 0;
        if (key === this.controls.right) this.dx = isDown ? this.speed : 0;
    }
    handleCollisionWithObstacle(obstacle) {
        const nextX = this.x + this.dx;
        const nextY = this.y + this.dy;
    
        const collidesX = nextX < obstacle.x + obstacle.width && 
                          nextX + this.size > obstacle.x;
        const collidesY = nextY < obstacle.y + obstacle.height && 
                          nextY + this.size > obstacle.y;
    
        if (collidesX && collidesY) {
            if (this.dx > 0 && this.x + this.size <= obstacle.x) {
                this.x = obstacle.x - this.size; 
                this.dx = 0;
            } else if (this.dx < 0 && this.x >= obstacle.x + obstacle.width) {
                this.x = obstacle.x + obstacle.width; 
                this.dx = 0;
            }
    
            // Si collision sur l'axe vertical
            if (this.dy > 0 && this.y + this.size <= obstacle.y) {
                this.y = obstacle.y - this.size; 
                this.dy = 0;
            } else if (this.dy < 0 && this.y >= obstacle.y + obstacle.height) {
                this.y = obstacle.y + obstacle.height; 
                this.dy = 0;
            }
        }
    }
}
