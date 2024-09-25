const { Weapon } = require('../Base/Weapons.js');
const Attacks = require('../Base/Attack.js');
const {Player} = require('./Player.js');
const { DamageType } = require('../Base/DamageTypes.js');
    



    class Mage extends Player {
        static #atk_pool = [
            {
                attack: new Attacks.MagicAttack('Fireball', 10),
                level: 1
            },
            {
                attack: new Attacks.PhysicalAttack('Throw Staff', 5),
                level: 2
            },
            {
                attack: new Attacks.MagicAttack('IceShard', 15),
                level: 5
            },
            {
                attack: new Attacks.HybridAttack('LightningBolt', 20, 15),
                level: 10
            }
        ]
        constructor(name) {
            super(name);
            this.intelligence = 5;
            this.dexterity = 3;
            this.strength = 1;
            this.weapon = new Weapon('Old Stick', 1, DamageType.Magic);
            this.attacks.push(Mage.#atk_pool[0].attack);
        }
        PlayerInfo() {
            return super.PlayerInfo("Mage");
        }

        castSpell(spellName) {
            if (this.mana > 0) {
                CH.print(`${this.name} casts ${spellName} with power ${this.spellPower}!`);
                this.mana -= 10; // Assume each spell costs 10 mana
            } else {
                CH.print(`${this.name} does not have enough mana to cast ${spellName}.`);
            }
        }
        levelUp() {
            super.levelUp();
            this.strength += 1;
            this.dexterity += 1;
            this.intelligence += 2;
            if (this.level % 3 === 0) {
                this.armor += 1
                this.magic_resist += 3
            }
            Mage.#atk_pool.forEach(atk => {
                if (this.level === atk.level) {
                    this.attacks.push(atk.attack);
                }
            });
        }
    }

    module.exports = {Mage};
