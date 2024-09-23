const { Weapon } = require('../Base/Weapons.js');
const Player = require('./Player.js');
const Attacks = require('../Base/Attack.js');

const atk_pool = [
    {
        attack: new Attacks.PhysicalAttack('Stab', 10),
        level: 1
    },
    {
        attack: new Attacks.MagicAttack('Poison Stike', 5),
        level: 2
    },
    {
        attack: new Attacks.HybridAttack('Shadow Blade', 10,20),
        level: 5
    },
    {
        attack: new Attacks.HybridAttack('Spectral Slice', 20, 15),
        level: 10
    }
]

class Rogue extends Player {   
    constructor(name) {
        super(name);
        this.intelligence = 2;
        this.dexterity = 5;
        this.strength = 2;
        this.weapon = new Weapon('Kitchen Knife', 1, 'Physical');
        this.attacks.push(atk_pool[0].attack);
    }
    PlayerInfo() {
        return super.PlayerInfo("Rogue");
    }
    levelUp() {
        super.levelUp();
        this.strength += 1;
        this.dexterity += 2;
        this.intelligence += 1;
        if (this.level % 3 === 0) {
            this.armor += 2
            this.magic_resist += 2
        }
        atk_pool.forEach(atk => {
            if (this.level === atk.level) {
                this.attacks.push(atk.attack);
            }
        });
    }

}

module.exports = {Rogue};

