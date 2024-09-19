const { Weapon } = require('../Base/Basics.js');
const Player = require('../Base/Player.js');

class Rogue extends Player {
    constructor(name, health, mana, spellPower) {
        super(name, health, mana);
        this.spellPower = spellPower;
        this.weapon = new Weapon('Staff', 1, 'Physical');
    }

    gain
}

module.exports = {Rogue};
