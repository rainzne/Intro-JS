let level_data= [];
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;
let currentLevelIndex = 0;

let players = [];
let obstacles = [];
let bonus = [];
let malus = [];
let goal;
let countdown = 5;



// Initialisation
function init() {
    players = [
        new Player(50, 50, "red", { up: "z", down: "s", left: "q", right: "d" }),
        new Player(100, 50, "blue", { up: "ArrowUp", down: "ArrowDown", left: "ArrowLeft", right: "ArrowRight" }),
    ];
    level_data = [new Level([ obstacles=[ new Obstacle(750, 150, 50, 300), new Obstacle(400, 100, 50, 300),], goal = new Goal(750, 550),bonus =  [new Bonus(300,200,50,55)], malus = []]),new Level([ obstacles=[ new Obstacle(10, 150, 50, 300), new Obstacle(500, 100, 50, 300),], goal = new Goal(750, 550), bonus =  [new Bonus(300,200,50,55)], malus = [new Malus(400,200,100,70)]])];
    
    startCountdown();
    console.log("init");
 

}




// Compte à rebours
function startCountdown() {
    const countdownInterval = setInterval(() => {
        document.getElementById("countdown").textContent = `Départ dans : ${countdown}`;
        countdown--;

        if (countdown < 0) {
            clearInterval(countdownInterval);
            document.getElementById("countdown").textContent = "Go !";
            gameLoop();
        }
    }, 1000);
}

// Boucle du jeu
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dessine les obstacles
    obstacles.forEach(obstacle => obstacle.draw(ctx));
    bonus.forEach(bonus => bonus.draw(ctx));
    malus.forEach(malus => malus.draw(ctx));

    // Dessine la sortie
    goal.draw(ctx);

    // Gestion des joueurs
    players.forEach(player => {
        obstacles.forEach(obstacle => player.handleCollisionWithObstacle(obstacle));
        player.move();
        player.draw(ctx);
    });
    

    // Détection de victoire
    players.forEach(player => {
        if (
            player.x < goal.x + goal.size &&
            player.x + player.size > goal.x - goal.size &&
            player.y < goal.y + goal.size &&
            player.y + player.size > goal.y - goal.size
        ) {
            document.getElementById("countdown").textContent = `${player.color} a gagné le niveau ${currentLevelIndex + 1} !`;

            setTimeout(() => {
                currentLevelIndex++;  // ICI VOIR A MODIFIER
                loadLevel(currentLevelIndex); // Passe au niveau suivant
            }, 2000); // Petite pause avant de charger le prochain niveau
        }
        bonus.forEach(singleBonus => {
            if (
                player.x < singleBonus.x + singleBonus.width &&
                player.x + player.size > singleBonus.x &&
                player.y < singleBonus.y + singleBonus.height &&
                player.y + player.size > singleBonus.y
            ) {
                player.speed = 2.3; // Boost de vitesse
                setTimeout(() => {
                    player.speed = 2; // Vitesse normale après 3 secondes
                }, 3000);
            }
        });
        
        malus.forEach(SingleMalus => {
            if (
                player.x < SingleMalus.x + SingleMalus.width &&
                player.x + player.size > SingleMalus.x &&
                player.y < SingleMalus.y + SingleMalus.height &&
                player.y + player.size > SingleMalus.y
            ) {
                player.speed = 1; // Ralentissement
                setTimeout(() => {
                    player.speed = 2; // Vitesse normale après 3 secondes
                }, 1500);
            }
        }

        )

        
       
        
    });
   

    requestAnimationFrame(gameLoop);
}

// Gestion des entrées clavier
window.addEventListener("keydown", e => {
    players.forEach(player => player.handleInput(e.key, true));
});
window.addEventListener("keyup", e => {
    players.forEach(player => player.handleInput(e.key, false));
});

// Lancer le jeu
window.onload=init;