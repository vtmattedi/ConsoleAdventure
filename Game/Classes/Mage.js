import { WeaponBuilder } from '../Base/Weapons.js';
import * as Attacks from '../Base/Attack.js';
import { Player } from './Player.js';
import { DamageType } from '../Base/DamageTypes.js';



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
            this.weapon = new WeaponBuilder()
                .withName('Old Stick')
                .withDamage(1)
                .withAttackType(DamageType.Magic)
                .build();
            this.attacks.push(Mage.#atk_pool[0].attack);
        }
        playerInfo() {
            return super.playerInfo("Mage");
        }

        getClass()
        {
            return "Mage";
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

    export{Mage};
