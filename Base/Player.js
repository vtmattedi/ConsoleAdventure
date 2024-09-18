const {Weapon} = require('./Basics');
class Player {
    constructor(name, health, strength) {
        this.name = name;
        this.health = health;
        this.strength = strength;
        this.level = 1;
        this.exp = 0;
        this.weapon = new Weapon('Fists', 1, 'punch');
        this.equipament = [];
        this.consumables = [];

    }

    attack(target) {
        if (target.health > 0) {
            target.health -= this.strength;
            console.log(`${this.name} attacks ${target.name} for ${this.strength} damage.`);
            if (target.health <= 0) {
                target.health = 0;
                console.log(`${target.name} has been defeated!`);
            } else {
                console.log(`${target.name} has ${target.health} health remaining.`);
            }
        } else {
            console.log(`${target.name} is already defeated.`);
        }
    }
    gainExp(amount) {
        this.exp += amount;
        console.log(`${this.name} has gained ${amount} experience points!`);
        if (this.exp >= 100) {
            this.levelUp();
            this.exp -= 100;
        }
    }
    levelUp() {
        this.level++;
        this.strength += 5;
        this.health += 10;
        console.log(`${this.name} has leveled up to level ${this.level}!`);
    }
}

module.exports = Player;