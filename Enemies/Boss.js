const Attack = require('./Attack');
const Enemy = require('./Enemy');

class Boss extends Enemy {
    constructor(name, health, attackPower, specialAbility) {
        super(name, health, attackPower);
        this.specialAbility = specialAbility;
    }

    useSpecialAbility() {
        console.log(`${this.name} uses ${this.specialAbility}!`);
        // Implement the special ability logic here
    }
}

module.exports = Boss;