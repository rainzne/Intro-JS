class Malus {
    constructor(x, y, width, height) {
        this.x = x*32;
        this.y = y*32;
        this.width = width*32;
        this.height = height*32;
        this.color = "purple";
        this.img = new Image();
        this.img.src = './textures/tiles/slow.png';
        this.pattern = null;
    }

    draw(ctx) {
        if(this.pattern == null){
            this.pattern = ctx.createPattern(this.img, 'repeat');
        }
        ctx.fillStyle = this.pattern;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  
   
    


}



//    // Dessiner les éléments ralentissement
//    players.forEach(player => {
//     obstacles.forEach(obstacle => {
//         if (obstacle.check_collision(player,obstacle)) {
//             // Si collision, repousse le joueur à sa position précédente
//             player.x -= player.dx;
//             player.y -= player.dy;
//         }
       
//     });
// });

