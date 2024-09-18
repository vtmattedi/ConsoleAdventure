const { Attack} = require('./Basics.js');

class Enemy {
    constructor(name, health, attackPower) {
        this.name = name;
        this.health = health;
        this.attackPower = attackPower;
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