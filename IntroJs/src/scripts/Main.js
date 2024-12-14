// let nbPlayers = getLocalStorageData("nbPlayers");
// if(nbPlayers <= 0){
//     nbPlayers = 1;
// }

// // Ajouter les joueurs à la liste des joueurs
// for(let i = 0; i < nbPlayers; i++){
//     players.push(new Player(30, 30, 0, height, colors[i], 0, 1, controllers[i]))
// }



let level_data= [];
let levelCompleted = false;
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
let goal;
let countdown = 0;
let timer = 10;


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
    }

    // Récupérer les données des niveaux
    level_data = [new Level(
        [new Obstacle(0, 5, 15, 1), new Obstacle(10, 12, 15, 1),new Obstacle(10,13,1,5),new Obstacle(20,18,1,7)],
        new Goal(23, 22),
        [new Bonus(10,6,2,6)],
        [new Malus(5,12,5,5)]),
          
        new Level( [
            new Obstacle(19,10,1,1),new Obstacle(17,11,3,1),new Obstacle(17,8,1,1),new Obstacle(16,8,1,4),new Obstacle(3, 0, 1, 10),new Obstacle(6,2,1,11),new Obstacle(0,13,7,1),new Obstacle(9,0,1,20)],
            new Goal(18,10),
            [new Bonus(0,14,5,5)],
            [new Malus(20,20,2,2),new Malus(17,15,2,2),new Malus(15,22,2,2),new Malus(10,18,2,2)]),
    
        new Level( [
            new Obstacle(200, 100, 300, 300), new Obstacle(600, 100, 100, 300),],
            new Goal(750, 550),
            [new Bonus(300,600,50,55)],
            [new Malus(100,50,100,100)])
            ];

    const levelInstance = level_data[0]; 
    currentLevelIndex =1;
    levelInstance.loadLevel(currentLevelIndex);
    startCountdown(() => {
        gameLoop();
        TimerLevel(); 
        
    });
    console.log("init");
}



function TimerLevel() {
    timer = 10; // Réinitialiser le temps
    const TimerCountDown = setInterval(() => {
        document.getElementById("timer").textContent = `Timer : ${timer}`;
        console.log(timer);
        timer--; 

        if (timer < 0) {
            clearInterval(TimerCountDown); 
            Timeout(); 
        }

       
    }, 1000);
}

// Compte à rebours
function startCountdown(callback) {
    countdown = 5; 
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
        console.log("speed after geler :" +player.speed);
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
                gameLoop(); 
            });
        }, 2000); 

    }, 2000);
}

function NextLevel() {
    currentLevelIndex++;

    if (currentLevelIndex < level_data.length) {
        const nextLevel = level_data[currentLevelIndex];
        nextLevel.loadLevel(currentLevelIndex); // Charger le prochain niveau
        levelCompleted = false; // Réinitialiser l'état du niveau

        players.forEach(player => {
            player.speed = 1.5; // Réinitialiser la vitesse
            player.x = 1;
            player.y = 1;
            console.log("speed after next level :" + player.speed);
        });
    } else {
        document.getElementById("countdown").textContent = "Tous les niveaux sont terminés !";
        window.location.href = "../src/EndGame.html";
    }
}



function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //draw backgournd with patern defined above
    const patern = ctx.createPattern(background, 'repeat');
    ctx.fillStyle = patern;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    obstacles.forEach(obstacle => obstacle.draw(ctx));
    bonus.forEach(bonus => bonus.draw(ctx));
    malus.forEach(malus => malus.draw(ctx));
    // InverseControl.forEach(InverseControl => InverseControl.draw(ctx));     //---------------

    
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
            player.x < goal.x + goal.size &&
            player.x + player.size > goal.x - goal.size &&
            player.y < goal.y + goal.size &&
            player.y + player.size > goal.y - goal.size
        ) {
            if (!levelCompleted){
                levelCompleted = true;
            document.getElementById("countdown").textContent = `${player.color} a gagné le niveau ${currentLevelIndex + 1} !`;
            document.getElementById("scores").textContent = `${player.color} a gagné ${4} points!`;

            setTimeout(() => {
                currentLevelIndex++;

                if (currentLevelIndex < level_data.length) {
                    levelCompleted = false;
                    const nextLevel = level_data[currentLevelIndex];
                    
                    nextLevel.loadLevel(currentLevelIndex);
                } else {
                    document.getElementById("countdown").textContent = "Tous les niveaux sont terminés !";
                    return;
                }}, 2000);
            }
        }
        bonus.forEach(singleBonus => {
            if (
                player.x < singleBonus.x + singleBonus.width &&
                player.x + player.size > singleBonus.x &&
                player.y < singleBonus.y + singleBonus.height &&
                player.y + player.size > singleBonus.y
            ) {
                player.speed = 1.5; // Boost de vitesse
                setTimeout(() => {
                    if (timer >=0){
                    player.speed = 1.35; // Vitesse normale après 3 secondes
                }
                }, 1500);
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
                    player.speed = 1.35; // Vitesse normale après 3 secondes
                }, 1500);
            }
        });
        InverseControl.forEach(SingleInverseControl => {
            if (
                player.x < SingleInverseControl.x + SingleInverseControl.width &&
                player.x + player.size > SingleInverseControl.x &&
                player.y < SingleInverseControl.y + SingleInverseControl.height &&
                player.y + player.size > SingleInverseControl.y
            ) {
                player.speed = 1;
                setTimeout(() => {
                    player.speed = 1.35; // Vitesse normale après 3 secondes
                }, 1500);
            }
        }); 
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