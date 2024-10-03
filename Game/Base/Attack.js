import { DamageType, Damage } from './DamageTypes.js';
import { GameColors } from './GameColors.js';

class Attack {
    #damage;     //Should be protected but ES6 so... {get; private set}
    #name;  //{get; private set}
    #attackType;   //{get; private set}
    constructor(name, damage, attackType) {
        if (typeof name !== 'string' || typeof damage !== 'number' || isNaN(attackType))
            throw new Error("Invalid parameters");
        this.#name = name; //Final {get; private set}
        this.#damage = damage; //Final, Private, use fn to get proper demage
        this.#attackType = attackType; //Final 
    }
    get name() {
        return this.#name;
    }
    get attackType() {
        return this.#attackType;
    }

    get damage() {
        return this.#damage
    }

    set damage(value) {
        this.#damage = value;
    }


    // /// Abstract method
    // getDamage() {
    //     throw new Error("Not implemented");
    // }


    calculateDamage(stats, weapon) {

        if (!stats)
            throw new Error("Stats must be provided");
        if (isNaN(stats.strength) || isNaN(stats.intelligence) || isNaN(stats.dexterity))
            throw new Error("Stats must be a valid object with strength, intelligence and dexterity");
        if (![DamageType.Magic, DamageType.Physical].includes(this.attackType))
            throw new Error("Method must be implemented in non Magic/Physical Attacks");

        let physical_damage = 0;
        let magic_damage = 0;
        if (this.attackType === DamageType.Physical)
            physical_damage = this.damage;
        else if (this.attackType === DamageType.Magic)
            magic_damage = this.damage;

        //Calculate damage based on stats
        //Physical Damage   = Base Damage + 1% per point of Strength + 0.5% per point of Dexterity
        //Magic Damage      = Base Damage + 1% per point of Intelligence + 0.5% per point of Dexterity
        magic_damage *= (1 + stats.intelligence / 100 + 0.5 * stats.dexterity / 100)
        physical_damage *= (1 + stats.strength / 100 + 0.5 * stats.dexterity / 100);
        if (weapon) {
            const weaponType = weapon.attackType;
            if (weaponType === this.attackType) {
                magic_damage *= weapon.damage;
            }
            else if (weaponType === DamageType.Hybrid) {
                magic_damage *= weapon.damage;
                physical_damage *= weapon.damage;
            }
        }
        return new Damage(physical_damage, magic_damage);
    }

    getColor() {
        return GameColors.weapon_colors[this.attackType].color;
    }

}

class MagicAttack extends Attack {
    constructor(name, damage) {
        super(name, damage, DamageType.Magic);
    }

}

class PhysicalAttack extends Attack {
    constructor(name, damage) {
        super(name, damage, DamageType.Physical);
    }

}

class HybridAttack extends Attack {
    #physical_damage; //strictly private
    #magic_damage; //strictly private
    constructor(name, magic_damage, physical_damage) {
        super(name, magic_damage, DamageType.Hybrid);
        this.#physical_damage = physical_damage;
        this.#magic_damage = magic_damage;
    }
    get damage() {
        return {
            physical_damage: this.#physical_damage,
            magic_damage: this.#magic_damage
        };
    }
    calculateDamage(stats, weapon) {
        let pd = this.#physical_damage;
        let md = this.#magic_damage;
        md *= (1 + stats.intelligence / 100 + 0.5 * stats.dexterity / 100);
        pd *= (1 + stats.strength / 100 + 0.5 * stats.dexterity / 100);

        if (weapon) {
            const weaponType = weapon.attackType;
            if (weaponType === DamageType.Hybrid) {
                md *= weapon.getDamage();
                pd *= weapon.getDamage();
            }
            else if (weaponType === DamageType.Physical) {
                pd *= weapon.getDamage();
            }
            else if (weaponType === DamageType.Magic) {
                md *= weapon.getDamage();
            }
        }

        return new Damage(pd, md);
    }
}



export{ Attack, MagicAttack, PhysicalAttack, HybridAttack };