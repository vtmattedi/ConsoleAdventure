const { Weapon } = require('../Base/Weapons.js');
const Player = require('./Player.js');

class Rogue extends Player {
    constructor(name, health, mana, spellPower) {
        super(name, health, mana);
        this.spellPower = spellPower;
        this.weapon = new Weapon('Staff', 1, 'Physical');
    }

}

module.exports = {Rogue};
