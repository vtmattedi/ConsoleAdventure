// Purpose: Game class to handle the game logic.
const ConsoleImpl = require('./Base/ConsoleHelp.js');
const CH = new ConsoleImpl.ConsoleImplementation_x86();
const { Player } = require('./Classes/Player.js');
const Enemies = require('./Enemies/Enemies.js');
const { Menu } = require('./Menu.js');
const { DamageType } = require('./Base/DamageTypes.js');
const { Weapon } = require('./Base/Weapons.js');
const { DevMode } = require('./Base/DevMode.js');
class Game {
    #devMode = false; // private
    #demoMode = false // {get; private set}
    #player = new Player("Cheater"); // {get; private set}
    #currentEnemy = new Enemies.Enemy(); // {get; private set}
    #isRunning = true;//{get; private set}
    #fleeAttempt = 0; // private
    
    constructor() {
        this.#currentEnemy = new Enemies.Minion("Bob", 10, 1, {
            strength: 5,
            intelligence: 2,
            dexterity: 3,
        });
        Menu.setDevMode(false);
        Menu.gameInstance = this;
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

    setDevMode(value) {
        if (typeof value !== "boolean") {
            this.#devMode = !this.#devMode;
        }
        else {
            this.#devMode = value;
        }
        this.#player.setDevMode(value);
        this.#currentEnemy.setDevMode(value);

    }

    generateEnemy(level) {
        if (typeof level !== "number") {
            throw new Error("Method not implemented.");
        }
        level = Math.round(level);
        const seed = Math.random();
        let new_enemy = new Enemy.Minion('Goblin', 18 * level, Math.min(level - 1, 1));
        if (seed < 0.3) {
            //Minion
        }
        else if (seed < 0.6) {
            new_enemy = new Enemy.CommonEnemy('Orc', 20 * level, level);
        }
        else if (seed < 0.8) {
            new_enemy = new Enemy.Elite('Troll', 22 * level, level);
        }
        else {
            new_enemy = new Enemy.Boss('Dragon', 25 * level, level + 1);
        }
        //generate loot

        const genLoot = (loot_level) => {

            const seed = Math.random();
            let new_loot = [];
            if (seed < 0.2 + loot_level * 0.01) {
                new_loot.push(loot[(Math.random() * loot.length - 1).toFixed(0)]);
            }
            else if (seed > 0.9) {
                new_loot.push( Weapon.genRandomWeapon(loot_level));

            }
            return new_loot;
        }

        this.#currentEnemy = new_enemy;
        return this.#currentEnemy
    }

}

module.exports = { Game };