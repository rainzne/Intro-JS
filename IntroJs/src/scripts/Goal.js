class Goal {
    constructor(x, y) {
        this.x = x*32;
        this.y = y*32;
        this.size = 30;
        this.color = "#00f";
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = "#000";
        ctx.stroke();
    }
}
