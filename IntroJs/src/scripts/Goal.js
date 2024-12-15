class Goal {
    constructor(x, y) {
        this.x = x*32;
        this.y = y*32;
        this.height = 2*32;
        this.width = 2*32;
        this.size = 32;
        this.animation = 0;
        this.animationMem = new Array((this.width/32)*(this.height/32));
    }

    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 3; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }


    draw(ctx) {
        this.animation = (this.animation+1)%20 ;
        if(this.animation == 0){
            //choose random color
            for(let i = 0; i < (this.width/32)*(this.height/32); i++){
                this.animationMem[i] = this.getRandomColor();
            }
        }
        for(let i = 0; i < 4;i++){
            ctx.fillStyle = this.animationMem[i];
            ctx.fillRect(this.x+(i%2)*32, this.y+(Math.floor(i/2)*32), 32, 32);
        }
    }
}
