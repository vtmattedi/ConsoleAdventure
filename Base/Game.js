// Purpose: Game class to handle the game logic.
const CH = require('./ConsoleHelp.js');
const {Player } = require('../Classes/Player.js');
const fs = require('fs');
const path = require('path');
const Enemies = require('../Enemies/Enemies.js');
class Game {
    #devMode = false;
    constructor(title) {
        this.title = title;
        this.isRunning = true;
        this.movent = [];
        this.currentEnemy = new Enemies.Minion("Bob", 10, 1, {
            strength: 5,
            intelligence: 2,
            dexterity: 3,
        });
    }
    playerMove(move) {
        this.movent.push(move);
        console.clear();
        console.log(`Player moves ${move} : ${this.movent}`);
    }

    SaveGame() {
        const saveData = {
            title: this.title,
            isRunning: this.isRunning,
            movent: this.movent
        };
        const dir = path.join(__dirname.substring(0, __dirname.lastIndexOf('/')),'Games');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        console.log(dir);
        const savePath = path.join(dir, 'savegame.json');

        fs.writeFileSync(savePath, JSON.stringify(saveData, null, 2), 'utf-8');
        console.log('Game saved successfully.');
        
    }
    LoadGame(filename) { 
        const dir = path.join(__dirname.substring(0, __dirname.lastIndexOf('/')),'Games');
        const savePath = path.join(dir, filename);
        if (fs.existsSync(savePath)) {
            const saveData = JSON.parse(fs.readFileSync(savePath, 'utf-8'));
            this.title = saveData.title;
            this.isRunning = saveData.isRunning;
            this.movent = saveData.movent;
            console.log('Game loaded successfully.');
        } else {
            console.log('Save file not found.');
        }

    }
    parseCommands(input)
    {
        if (input[0] === '/') {
            const parts = input.slice(1).split(' ');
            const command = parts[0];
            const args = parts.slice(1);
            this.handleCommands(command, args);
            return true;
        }
        return false
    }
    handleCommands(command, args)
    {
        if (command === 'help') {
            console.log('Available commands:');
        }
        else if (command === 'dev') {
            this.#devMode = !this.#devMode;
            console.log(`Dev mode is now ${this.#devMode ? 'enabled' : 'disabled'}.`);
        }
        else if (command === 'save') {
            this.SaveGame();
        }
        else if (command === 'load') {
            this.LoadGame(args[0]);
        }
    }
    End()
    {
        this.isRunning = false;
    }
}

module.exports = {Game};