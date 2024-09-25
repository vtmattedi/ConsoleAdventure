// Purpose: Game class to handle the game logic.
const ConsoleImpl = require ('./Base/ConsoleHelp.js');
const CH = new ConsoleImpl.ConsoleImplementation_x86();
const {Player}  = require('./Classes/Player.js');
const fs = require('fs');
const path = require('path');
const Enemies = require('./Enemies/Enemies.js');
const { Menu } = require('./Menu.js');
class Game {
    #devMode = false;
    #demoMode = false;
    #player = new Player("Cheater");
    #currentEnemy =  new Enemies.Enemy();
    #isRunning = true;

    constructor() {
        this.#currentEnemy = new Enemies.Minion("Bob", 10, 1, {
            strength: 5,
            intelligence: 2,
            dexterity: 3,
        });
    }
    
    get devMode() {
        return this.#devMode;
    }

    get player() {
        return this.#player;
    }

    get currentEnemy() {
        return this.#currentEnemy;
    }

    get isRunning() {
        return this.#isRunning;
    }

    
    setdevMode(value) {
        if (typeof value !== "boolean") {
            this.#devMode = !this.#devMode;
        }
        else {
            this.#devMode = value;
        }
        this.#player.setDevMode(value);
        this.#currentEnemy.setDevMode(value);

    }

   
}

module.exports = {Game};