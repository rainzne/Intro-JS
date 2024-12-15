// let nbPlayers = getLocalStorageData("nbPlayers");
// if(nbPlayers <= 0){
//     nbPlayers = 1;
// }

// // Ajouter les joueurs à la liste des joueurs
// for(let i = 0; i < nbPlayers; i++){
//     players.push(new Player(30, 30, 0, height, colors[i], 0, 1, controllers[i]))
// }



let level_data= [];

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;
let currentLevelIndex = 0;

let players = [];
let obstacles = [];
let bonus = [];
let malus = [];
let InverseControl = [];
let deathZone = [];
let laser = [];
let goal;
let countdown;
let timer; // changer la durée du timer dans la function timerLevel
let TimerCountDown;


let background = new Image(32,32);
background.src = './textures/tiles/background.png';

function getLocalStorageData(key){

    let data = localStorage.getItem(key);

    if(data != null){
        return data;
    }
    else{
        localStorage.setItem(key, 0);
        return localStorage.getItem(key);
    }

}

// Fonction pour enregistrer une valeur dans la localStorage en utilsant une paire clé-valeur
function setLocalStorageData(key, value){

    let data = localStorage.getItem(key);

    if(data == null){
        localStorage.setItem(key, value)
    }
    else if(data === value){
        //do nothing
        console.log("Valeur inchangée dans le localStorage");
    }
    else{
        localStorage.setItem(key, value);
    }
}

async function getLevelData(url){
    fetch(url).then((response) => {
        if(response.ok){
            return response.json();
        }else{
            throw new Error("Erreur de chargement des données");
        }
    }).then((data) => {
        console.log(data);
        return data;
    }).catch((error) => {
        console.error(error);
    });
}

// Initialisation
function init() {
    const playerColors = ["red", "blue", "green", "yellow"];
    const playerControls = [
    { up: "z", down: "s", left: "q", right: "d" },
    { up: "ArrowUp", down: "ArrowDown", left: "ArrowLeft", right: "ArrowRight" },
    { up: "5", down: "2", left: "1", right: "3" },
    { up: "i", down: "k", left: "j", right: "l" },
];

    let nbPlayers = getLocalStorageData("nbPlayers");
    
    // Ajouter les joueurs à la liste des joueurs
    for(let i = 0; i < nbPlayers; i++){
        players.push(new Player(1,1,playerColors[i], playerControls[i]));
        players[i].score = 0;
    }

    // Récupérer les données des niveaux
    level_data = [
        new Level(
            [new Obstacle(0, 5, 15, 1), new Obstacle(10, 12, 15, 1),new Obstacle(10,13,1,5),new Obstacle(20,18,1,7)],
            new Goal(22, 21),
            [new Bonus(10,6,2,6)],
            [new Malus(5,12,5,5)],
            [],
            [],
            [],),

        new Level(
            [new Obstacle(22,5,3,20),new Obstacle(10,0,15,5),new Obstacle(19,10,1,1),new Obstacle(17,11,3,1),new Obstacle(17,8,1,1),new Obstacle(16,8,1,4),new Obstacle(3, 0, 1, 10),new Obstacle(6,2,1,11),new Obstacle(0,13,7,1),new Obstacle(9,0,1,20)],
            new Goal(17,9),
            [new Bonus(0,14,5,5)],
            [new Malus(11,8,4,4),new Malus(20,10,2,2),new Malus(20,20,2,2),new Malus(17,15,2,2),new Malus(15,22,2,2),new Malus(10,18,2,2)],
            [],
            []),
    
        new Level(
            [new Obstacle(15,13,3,4),new Obstacle(22,10,3,15),new Obstacle(0,20,9,5),new Obstacle(6,0,19,10)],
            new Goal(11.5, 21.5),
            [new Bonus(5,11,1,8)],
            [],
            [],
            [new DeathZone(3,9,2,2),new DeathZone(0,4,2,2),new DeathZone(9,20,1,5),new DeathZone(0,19,18,1),new DeathZone(21,11,1,14),new DeathZone(5,10,17,1),new DeathZone(5,0,1,10)],
            [],
        ),
        
        new Level(
            [],
            new Goal(11, 11),
            [],
            [],
            [],
            [new DeathZone(2,2,1,20),new DeathZone(21,2,1,20),new DeathZone(5,18,14,1),new DeathZone(5,5,14,1),new DeathZone(15,8,1,8),new DeathZone(8,8,1,8),new DeathZone(10,13,4,1),new DeathZone(10,10,4,1)],
            [],
        ),
        
        new Level(
            [new Obstacle(24,1,1,23),new Obstacle(0,5,1,19),new Obstacle(5,0,20,1),new Obstacle(0,24,25,1)],
            new Goal(20, 11),
            [],
            [],
            [],
            [],
            [new Laser(10,15,"down",0,80),new Laser(15,10,"up",0,80),new Laser(15,15,"right",0,80),new Laser(10,10,"left",0,80)],
        ),

        new Level(
            [new Obstacle(5,5,5,5),new Obstacle(24,1,1,23),new Obstacle(0,5,1,19),new Obstacle(5,0,20,1),new Obstacle(0,24,25,1)],
            new Goal(20, 20),
            [],
            [],
            [],
            [],
            [new Laser(14,17,"up",0,150),new Laser(13,16,"up",0,100),new Laser(12,15,"up",0,50)], 
        ),

        new Level(
            [new Obstacle(12,12,5,5),new Obstacle(5,5,5,5),new Obstacle(24,1,1,23),new Obstacle(0,5,1,19),new Obstacle(5,0,20,1),new Obstacle(0,24,25,1)],
            new Goal(20, 20),
            [new Bonus(10,10,2,2)],
            [new Malus(12,18,2,6)],
            [],
            [new DeathZone(21,13,3,3),new DeathZone(12,17,6,1),new DeathZone(17,12,1,5)],
            [new Laser(19,19,"up",0,20)],
        ),

        new Level(
            [new Obstacle(3,18,1,1),new Obstacle(23,18,1,1),new Obstacle(19,1,1,1),new Obstacle(10,1,1,1),new Obstacle(13,24,1,1),new Obstacle(24,13,1,1),new Obstacle(13,0,1,1),new Obstacle(0,15,1,1),new Obstacle(10,20,1,1),new Obstacle(19,15,1,1),new Obstacle(13,13,1,1)],
            new Goal(20, 20),
            [],
            [new Malus(5,7,3,3)],
            [],
            [new DeathZone(0,24,13,1),new DeathZone(24,0,1,13)],
            [new Laser(10,18,"right",0,30),new Laser(19,13,"left",0,30),new Laser(19,13,"down",0,30),new Laser(13,15,"up",0,30)],
        ),

        new Level(
            [new Obstacle(0,2,1,23),new Obstacle(24,0,1,24),new Obstacle(2,0,22,1),new Obstacle(1,24,24,1)],
            new Goal(10, 10),
            [new Bonus(2,2,2,2)],
            [],
            [],
            [new DeathZone(10,5,8,5),new DeathZone(5,5,5,15)],
            [new Laser(18,20,"up",0,12)],
        ),

        new Level(
            [new Obstacle(2,0,23,1),new Obstacle(21,1,4,24)],
            new Goal(0, 23),
            [new Bonus(20,1,1,23)],
            [],
            [],
            [new DeathZone(0,18,15,1),new DeathZone(5,12,15,1),new DeathZone(0,6,15,1)],
            [new Laser(4,24,"down",0,22),new Laser(20,24,"up",0,22),new Laser(7,24,"left",0,50),new Laser(13,24,"down",0,70),new Laser(10,24,"up",0,100)],
        )
        ];

    const levelInstance = level_data[0]; 
    currentLevelIndex = 0;
    levelInstance.loadLevel(currentLevelIndex);
    startCountdown(() => {
        gameLoop();
        TimerLevel(); 
    });
    console.log("init");
}



function TimerLevel() {
    timer = 50; // Réinitialiser le temps
    TimerCountDown = setInterval(() => {
        document.getElementById("timer").textContent = `Timer : ${timer}`;
        console.log(timer);
        timer--; 

        if (timer < 3) {
            clearInterval(TimerCountDown); 
            Timeout(); 
        }

       
    }, 1000);
}

// Compte à rebours
function startCountdown(callback) {
    countdown = 0; 
    const countdownInterval = setInterval(() => {
        document.getElementById("countdown").textContent = `Départ dans : ${countdown}`;
        countdown--;

        if (countdown < 0) {
            clearInterval(countdownInterval);
            document.getElementById("countdown").textContent = "GO!";
            if (callback) callback();
        }
    }, 1000);
}


function Timeout() {
    // Geler les joueurs
    players.forEach(player => {
        player.speed = 0;
        player.dx = 0;
        player.dy = 0;
    });

   
    document.getElementById("countdown").textContent = "Temps écoulé !";

    
    setTimeout(() => {
        
       
        console.log("TimeoutAZAZAZZ");
        setTimeout(() => {
            startCountdown(() => {
                NextLevel(); 
                TimerLevel(); 
            });
        }, 2000); 

    }, 2000);
}

function NextLevel() {
    currentLevelIndex++;

    if (currentLevelIndex < level_data.length) {
        const nextLevel = level_data[currentLevelIndex];
        nextLevel.loadLevel(currentLevelIndex); // Charger le prochain niveau
        

        players.forEach(player => {
            player.PlayerLevelCompleted = false; // Réinitialiser le statut du joueur
            player.speed = 1.35; // Réinitialiser la vitesse
            player.x = 1;
            player.y = 1;
            //console.log("speed after next level :" + player.speed);
        });
    } else {
        
        document.getElementById("countdown").textContent = "Tous les niveaux sont terminés !";
        
        window.location.href = "Endgame.html";
        afficherScoresEnd();
    }
}



function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const patern = ctx.createPattern(background, 'repeat');
    ctx.fillStyle = patern;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    obstacles.forEach(obstacle => obstacle.draw(ctx));
    bonus.forEach(bonus => bonus.draw(ctx));
    malus.forEach(malus => malus.draw(ctx));
    // InverseControl.forEach(InverseControl => InverseControl.draw(ctx));     //---------------
    deathZone.forEach(deathZone => deathZone.draw(ctx));
    laser.forEach(lasers => lasers.draw(ctx,obstacles,laser));
    
    goal.draw(ctx);

    // Gestion des joueurs
    players.forEach(player => {
        obstacles.forEach(obstacle => player.handleCollisionWithObstacle(obstacle));
       
        player.draw(ctx);
        player.move();
    });
    

    // Détection de beaucoup de chose : collision avec les obstacles, le but, les bonus, les malus, les InverseControl
    players.forEach(player => {
        if (
            player.x < goal.x + goal.width &&
            player.x + player.size > goal.x &&
            player.y < goal.y + goal.height &&
            player.y + player.size > goal.y
        ) {
            if (!player.PlayerLevelCompleted){
                player.PlayerLevelCompleted = true;
                player.speed = 0; // Bloquer le joueur
                player.score += 4 - players.filter(p => p.PlayerLevelCompleted).length;
            
            document.getElementById("scores").textContent = `${player.color} a gagné ${player.score} points!`;
            afficherScores();
            

            if (players.every(p => p.PlayerLevelCompleted)) {
                clearInterval(TimerCountDown); // Désactiver le timer
                setTimeout(() => {
                    NextLevel();
                    TimerLevel();
                    }, 2000);
                }
            }
        }
        bonus.forEach(singleBonus => {
            if (
                player.x < singleBonus.x + singleBonus.width &&
                player.x + player.size > singleBonus.x &&
                player.y < singleBonus.y + singleBonus.height &&
                player.y + player.size > singleBonus.y
            ) {
                
                
                 if(player.speed === 1.35){
                    player.speed = 1.5; // Bonus de vitesse
                    setTimeout(() => {
                        if (timer >= 0){                       
               
                        player.speed = 1.35; // Vitesse normale après 3 secondes
                 }}, 2000);
                }
                }
            
        });
        
        malus.forEach(SingleMalus => {
            if (
                player.x < SingleMalus.x + SingleMalus.width &&
                player.x + player.size > SingleMalus.x &&
                player.y < SingleMalus.y + SingleMalus.height &&
                player.y + player.size > SingleMalus.y
            ) {
                if(player.speed === 1.35){
                    player.speed = 1; // Ralentissement
                    setTimeout(() => {
                        if (timer >= 0){
                        player.speed = 1.35; // Vitesse normale après 3 secondes
                }}, 2000);
                }
            }
        });
        InverseControl.forEach(SingleInverseControl => {
            if (
                player.x < SingleInverseControl.x + SingleInverseControl.width &&
                player.x + player.size > SingleInverseControl.x &&
                player.y < SingleInverseControl.y + SingleInverseControl.height &&
                player.y + player.size > SingleInverseControl.y
            ) {
                if(player.speed = 1.35){
                    player.speed = 1; // Inversion de contrôle
                    setTimeout(() => {
                        player.speed = 1.35; // Vitesse normale après 3 secondes
                    }, 1500);
                }
            }
        });
        deathZone.forEach(singleDeathZone => {
            if (
                player.x < singleDeathZone.x + singleDeathZone.width &&
                player.x + player.size > singleDeathZone.x &&
                player.y < singleDeathZone.y + singleDeathZone.height &&
                player.y + player.size > singleDeathZone.y
            ) {
                // Réinitialiser le joueur
                player.x = 1;
                player.y = 1;
                // To do animation
            }
        });
        laser.forEach((singleLaser) => {
            if(
                //singleLaser.laserCoord = [x,y,width,height]
                player.x < singleLaser.laserCoord[0] + singleLaser.laserCoord[2] &&
                player.x + player.size > singleLaser.laserCoord[0] &&
                player.y < singleLaser.laserCoord[1] + singleLaser.laserCoord[3] &&
                player.y + player.size > singleLaser.laserCoord[1]
            ){
                player.x = 1;
                player.y = 1;
            }
        });
    });
    
    requestAnimationFrame(gameLoop);
}

function resultats() {
    let resultats = [];
    players.forEach(player => {
        resultats.push({
            couleur: player.color,
            score: player.score
        });
    });
    return resultats;
}


function afficherScores() {
    let scores = "";
    players.forEach(player => {
        scores += `${player.color}: ${player.score} points `;
        StoreScoreEnd();
    });
    document.getElementById("scores").innerHTML = scores;
}
function afficherScoresEnd() {
    let scores = "";
    const playerColors = ["red", "blue", "green", "yellow"];
    playerColors.forEach(color => {
        let score = getLocalStorageData(`score${color}`);
        scores += `${color}: ${score} points<br>`;
    });
    document.getElementById("scoress").innerHTML = scores;
}

function StoreScoreEnd() {
        for (let i = 0; i < players.length; i++) {
            setLocalStorageData(`score${players[i].color}`, players[i].score);
        }
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