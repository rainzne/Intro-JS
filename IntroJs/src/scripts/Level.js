const playerStartPositions = [
    { x: 10, y: 10 }, 
    { x: 10, y: 10 },
    { x: 10, y: 10 }, 
    { x: 10, y: 10 } 
];

class Level {
    constructor(obstacles, goal, bonus = [], malus = [],InverseControl = [],deathZone = [],laser = []) {
        this.obstacles = obstacles;
        this.goal = goal;
        this.bonus = bonus;
        this.malus = malus;
        this.InverseControl = InverseControl;
        this.deathZone = deathZone;
        this.laser = laser;
    }

    //transforme le json en level
    //constructor(json) {
    //    console.log("construct ",json);
    //    this.obstacles = json.obstacles.map(obstacle => new Obstacle(obstacle.x, obstacle.y, obstacle.width, obstacle.height));
    //    this.goal = new Goal(json.goal.x, json.goal.y, json.goal.size);
    //    this.bonus = json.bonus.map(bonus => new Bonus(bonus.x, bonus.y, bonus.width, bonus.height));
    //    this.malus = json.malus.map(malus => new Malus(malus.x, malus.y, malus.width, malus.height));
    //}
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
        deathZone= level.deathZone;
        laser= level.laser;
        players.forEach((player, index) => {
            player.x = playerStartPositions[index].x;
            player.y = playerStartPositions[index].y;
        });
            
    }
}


