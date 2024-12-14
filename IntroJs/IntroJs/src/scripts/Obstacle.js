class Obstacle {
    constructor(x, y, width, height) {
        this.x = x*32;
        this.y = y*32;
        this.width = width*32;
        this.height = height*32;
        this.color = "#555";
        this.img = new Image();
        this.img.src = './textures/tiles/walls.png';
    }

    draw(ctx) {
        const patern = ctx.createPattern(this.img, 'repeat');
        ctx.fillStyle = patern;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  
   
    


}