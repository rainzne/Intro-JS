class Bonus {
    constructor(x, y, width, height,ctx) {
        this.x = x*32;
        this.y = y*32;
        this.width = width*32;
        this.height = height*32;
        this.color = "lightgreen";
        this.animation = 0;
        this.img = [];
        this.getImage();
        this.paterns = [];
    }

    getImage(){
        for(let i = 1; i <=9 ; i++){
            this.img[i-1] = new Image();
            this.img[i-1].src = `./textures/tiles/bonus/bonus${i}.png`;
        }
    }

    getPattern(ctx){
        for(let i = 0; i < 9; i++){
            this.paterns[i] = ctx.createPattern(this.img[i], 'repeat');
        }
    }

    draw(ctx) {
        if(this.paterns.length == 0){
            this.getPattern(ctx);
        }
        this.animation= (this.animation + 1) % 90;
        ctx.fillStyle = this.paterns[Math.floor(this.animation/10)];
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  
   
    


}