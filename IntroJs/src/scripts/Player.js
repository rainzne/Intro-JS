class Player {
    constructor(x, y, color, controls) {
        this.x = x;
        this.y = y;
        this.size = 20;
        this.color = color;
        this.speed = 1.5;
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
        const nextX = this.x + this.dx * this.speed;
        const nextY = this.y + this.dy * this.speed;
    
        
        const collidesX = nextX < obstacle.x + obstacle.width &&
                          nextX + this.size > obstacle.x;
        const collidesY = nextY < obstacle.y + obstacle.height &&
                          nextY + this.size > obstacle.y;
    
        if (collidesX && collidesY) {
            
            const playerTop = nextY;
            const playerBottom = nextY + this.size;
            const playerLeft = nextX;
            const playerRight = nextX + this.size;
    
            const obstacleTop = obstacle.y;
            const obstacleBottom = obstacle.y + obstacle.height;
            const obstacleLeft = obstacle.x;
            const obstacleRight = obstacle.x + obstacle.width;
    
            
            const overlapTop = playerBottom - obstacleTop;
            const overlapBottom = obstacleBottom - playerTop;
            const overlapLeft = playerRight - obstacleLeft;
            const overlapRight = obstacleRight - playerLeft;
            
    
            // Trouve le côté avec le plus petit chevauchement
            const minOverlap = Math.min(overlapTop, overlapBottom, overlapLeft, overlapRight);
    
            if (minOverlap === overlapTop) {
                // Collision en haut
                this.y = obstacleTop - this.size;
                this.dy = 0;
            } else if (minOverlap === overlapBottom) {
                // Collision en bas
                this.y = obstacleBottom;
                this.dy = 0;
            } else if (minOverlap === overlapLeft) {
                // Collision à gauche
                this.x = obstacleLeft - this.size;
                this.dx = 0;
            } else if (minOverlap === overlapRight) {
                // Collision à droite
                this.x = obstacleRight;
                this.dx = 0;
            }
        }
    }
}

