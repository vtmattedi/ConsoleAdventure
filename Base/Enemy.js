const { Attack, Unit} = require('./Basics.js');

function getRandomAttackType() {
    const randomChance = Math.random();
    const HybridChance = 0.1;
    if (randomChance < 0.1) {
        return "Hybrid";
    } else if (randomChance < HybridChance + (1 - HybridChance) / 2) {
        return "Magic";
    } else {
        return "Physical";
    }
}

class Enemy extends Unit {
    constructor(name, health, attackPower) {
        super(health, 0, 0);
        this.name = name;
        this.attackPower = attackPower;
        this.demageType = getRandomAttackType();

    }

    attack(target) {
        console.log(`${this.name} attacks ${target.name} for ${this.attackPower} damage!`);
        target.takeDamage(this.attackPower);
    }

    takeDamage(amount) {
        this.health -= amount;
        console.log(`${this.name} takes ${amount} damage! Health is now ${this.health}.`);
        return this.isDead();
    }

    isDead() {
        return this.health <= 0;
    }
}

module.exports = Enemy;