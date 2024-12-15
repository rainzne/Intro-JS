class DeathZone {
    constructor(x, y, width, height,ctx) {
        this.x = x*32;
        this.y = y*32;
        this.width = width*32;
        this.height = height*32;
        this.animation = 0;
        this.img = [];
        this.getImage();
        this.paterns = [];
        this.animationMem = [];
    }

    getImage(){
        for(let i = 1; i <=2 ; i++){
            this.img[i-1] = new Image();
            this.img[i-1].src = `./textures/tiles/death/img${i}.png`;
        }
    }

    getPattern(ctx){
        for(let i = 0; i < 2; i++){
            this.paterns[i] = ctx.createPattern(this.img[i], 'repeat');
        }
    }

    draw(ctx) {
        if(this.paterns.length === 0){
            this.getPattern(ctx);
            this.animationMem = new Array((this.width/32)*(this.height/32));
        }
        this.animation = (this.animation+1)%13 ;
        if(this.animation == 0){
            //choose random texture
            for(let i = 0; i < (this.width/32)*(this.height/32); i++){
                this.animationMem[i] = Math.floor(Math.random()*2);
            }
        }
        for(let i = 0; i < (this.width/32)*(this.height/32); i++){
            ctx.fillStyle = this.paterns[this.animationMem[i]];
            ctx.fillRect(this.x+(i%((this.width/32))*32), this.y+(Math.floor(i/(this.width/32))*32), 32, 32);
        }
    }
  
   
    


}