class Bonus {
    constructor(x, y, width, height) {
        this.x = x*32;
        this.y = y*32;
        this.width = width*32;
        this.height = height*32;
        this.color = "lightgreen";
        this.img = new Image();
        this.img.src = './textures/tiles/boost.png';
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        const patern = ctx.createPattern(this.img, 'repeat');
        ctx.fillStyle = patern;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  
   
    


}