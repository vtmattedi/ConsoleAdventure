import { WeaponBuilder } from '../Base/Weapons.js';
import { Player } from './Player.js';
import * as Attacks from '../Base/Attack.js';
import { DamageType } from '../Base/DamageTypes.js';


class Warrior extends Player {
    static #atk_pool = [
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
    constructor(name) {
        super(name);
        this.intelligence = 1;
        this.dexterity = 2;
        this.strength = 6;
        this.weapon = new WeaponBuilder()
            .withName('Own Fist')
            .withDamage(1)
            .withAttackType(DamageType.Physical)
            .build();
        this.attacks.push(Warrior.#atk_pool[0].attack);

    }
    playerInfo() {
        return super.playerInfo("Warrior");
    }
    getClass() {
        return "Warrior";
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
        Warrior.#atk_pool.forEach(atk => {
            if (this.level === atk.level) {
                this.attacks.push(atk.attack);
            }
        });
    }

}

export{ Warrior };
