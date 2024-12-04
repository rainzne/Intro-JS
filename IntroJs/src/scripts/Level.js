const playerStartPositions = [
    { x: 10, y: 10 }, // Position de départ du joueur 1
    { x: 10, y: 10 } // Position de départ du joueur 2
];

class Level {
    constructor(obstacles, goal, bonus = [], malus = []) {
        this.obstacles = obstacles;
        this.goal = goal;
        this.bonus = bonus;
        this.malus = malus;
    }

    // Charge les éléments du niveau dans le jeu
    load() {
        return {
            obstacles: this.obstacles,
            goal: this.goal,
            bonus: this.bonus,
            malus: this.malus,
        };
    }
     loadLevel(levelIndex) {
        if (levelIndex >= level_data.length) {
            document.getElementById("countdown").textContent = "Vous avez terminé tous les niveaux !";
            return;
        } 
            
                const level = level_data[levelIndex];
                obstacles= level.obstacles;
                goal= level.goal;
                bonus=  level.bonus;
                malus=  level.malus;
                players.forEach((player, index) => {
                    player.x = playerStartPositions[index].x;
                    player.y = playerStartPositions[index].y;
                });
            
        }
}


