const { Weapon } = require('../Base/Weapons.js');
const {Player} = require('./Player.js');
const Attacks = require('../Base/Attack.js');
const { DamageType } = require('../Base/DamageTypes.js');



class Rogue extends Player {
    static #atk_pool = [
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
    constructor(name) {
        super(name);
        this.intelligence = 2;
        this.dexterity = 5;
        this.strength = 2;
        this.weapon = new Weapon.Builder()
            .setName('Kitchen Knife')
            .setDamage(1)
            .setDamageType(DamageType.Physical)
            .build();
        this.attacks.push(Rogue.#atk_pool[0].attack);
    }
    playerInfo() {
        return super.playerInfo("Rogue");
    }
    getClass()
    {
        return "Rogue";
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
        Rogue.#atk_pool.forEach(attack => {
            if (this.level === attack.level) {
                this.attacks.push(attack.attack);
            }
        });
    }

}

module.exports = {Rogue};

