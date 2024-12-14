class Player {
    sprite1 = new Image();
    sprite2 = new Image();
    

    constructor(x, y, color, controls) {
        this.x = x;
        this.y = y;
        this.size = 20;
        this.color = color;
        this.speed = 1.35;
        this.controls = controls;
        this.dx = 0;
        this.dy = 0;
        this.animation = 0;
        this.img = [];
        this.getImage();
        this.bonus_icon = this.imageToTransparent('./textures/sprite/bonus.png');
        this.malus_icon = this.imageToTransparent('./textures/sprite/malus.png');
    }

    imageToTransparent(imglink){
        //make the white pixel transparent of the image and return the new image
        let imgtemp = new Image();
        imgtemp.src = imglink;
        imgtemp.onload = () => {
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        canvas.width = imgtemp.width;
        canvas.height = imgtemp.height;
        ctx.drawImage(imgtemp, 0, 0);
        let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < imgData.data.length; i += 4) {
            if (imgData.data[i] == 255 && imgData.data[i + 1] == 255 && imgData.data[i + 2] == 255) {
                imgData.data[i + 3] = 0;
            }
        }
        ctx.putImageData(imgData, 0, 0);
        imgtemp.src = canvas.toDataURL();
        }
        return imgtemp;
    }

    getImage(){
        if(this.color == "blue"){
            for(let i = 1; i <=2 ; i++){
                this.img[i-1] = new Image();
                this.img[i-1].src = `./textures/sprite/player_blue/idle_${i}.png`;
            }
        }else if(this.color == "red"){
            for(let i = 1; i <=2 ; i++){
                this.img[i-1] = new Image();
                this.img[i-1].src = `./textures/sprite/player_red/idle_${i}.png`;
            }
        }
    }

    draw(ctx) {
        //console.log(this.speed);
        this.animation= (this.animation + 1) % 40;
        //ctx.fillStyle = this.paterns[Math.floor(this.animation/10)];
        ctx.drawImage(this.img[Math.floor(this.animation/20)], this.x, this.y, this.size, this.size);
        if(this.speed > 1.35){
            ctx.drawImage(this.bonus_icon, this.x+15, this.y-2, 8, 8);
        }else if (this.speed < 1.35){
            ctx.drawImage(this.malus_icon, this.x+15, this.y-2, 8, 8);
        }
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

