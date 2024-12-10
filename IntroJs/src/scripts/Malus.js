class Malus {
    constructor(x, y, width, height) {
        this.x = x*32;
        this.y = y*32;
        this.width = width*32;
        this.height = height*32;
        this.color = "purple";
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
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

