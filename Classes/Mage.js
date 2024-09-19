const { Weapon } = require('../Base/Basics.js');
const Player = require('../Base/Player.js');
    
    class Mage extends Player {
        constructor(name, health, mana, spellPower) {
            super(name, health, mana);
            this.spellPower = spellPower;
            this.weapon = new Weapon('Staff', 1, 'Physical');
        }

        castSpell(spellName) {
            if (this.mana > 0) {
                console.log(`${this.name} casts ${spellName} with power ${this.spellPower}!`);
                this.mana -= 10; // Assume each spell costs 10 mana
            } else {
                console.log(`${this.name} does not have enough mana to cast ${spellName}.`);
            }
        }
    }

    module.exports = {Mage};
