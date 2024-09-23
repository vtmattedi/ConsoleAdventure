const { Weapon } = require('../Base/Weapons.js');
const Player = require('./Player.js');
const Attacks = require('../Base/Attack.js');

const atk_pool = [
    {
        attack: new Attacks.PhysicalAttack('Berserker Slash', 10),
        level: 1
    },
    {
        attack: new Attacks.PhysicalAttack('Bloodrage', 15),
        level: 2
    },
    {
        attack: new Attacks.MagicAttack('Runic Blast', 10),
        level: 5
    },
    {
        attack: new Attacks.HybridAttack('Infernal Strike', 20, 15),
        level: 10
    }
]

class Warrior extends Player {
    constructor(name) {
        super(name);
        this.intelligence = 1;
        this.dexterity = 2;
        this.strength = 6;
        this.weapon = new Weapon('Own Fist', 1, 'Physical');
        this.attacks.push(atk_pool[0].attack);

    }
    PlayerInfo() {
        return super.PlayerInfo("Warrior");
    }
    castSpell(spellName) {
        if (this.mana > 0) {
            console.log(`${this.name} casts ${spellName} with power ${this.spellPower}!`);
            this.mana -= 10; // Assume each spell costs 10 mana
        } else {
            console.log(`${this.name} does not have enough mana to cast ${spellName}.`);
        }
    }

    levelUp() {
        super.levelUp();
        this.strength += 2;
        this.dexterity += 1;
        this.intelligence += 1;
        if (this.level % 3 === 0) {
            this.armor += 3
            this.magic_resist += 1
        }
        atk_pool.forEach(atk => {
            if (this.level === atk.level) {
                this.attacks.push(atk.attack);
            }
        });
    }

}

module.exports = { Warrior };
