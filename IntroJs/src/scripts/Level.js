
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
}
}

