class Bonus {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
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