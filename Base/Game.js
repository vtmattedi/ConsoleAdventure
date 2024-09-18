class Game {
    constructor(title) {
        this.title = title;
        this.isRunning = false;
    }

    SaveGame() {
        console.log(`Game Saved!`);
    }
    LoadGame() { 
    }
}

module.exports = Game;