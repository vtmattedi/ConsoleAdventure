class Attack {
    constructor(name, damage, attackType) {
        this.name = name;
        this.damage = damage;
        this.attackType = attackType;
    }

    /// Abstract method
    getDamage() {
        throw new Error("Not implemented");
    }

    applyStats(weapon, stats) {
        if (this.attackType == "Physical") {
            this.damage *= (1 + stats.strength / 100 + 0.5 * stats.dexterity / 100);
        }
        else if (this.attackType == "Magic") {
            this.damage *= (1 + stats.intelligence / 100 + 0.5 * stats.dexterity / 100);
        }
        if (weapon) {
            const weaponType = weapon.attackType;
            if (this.attackType === weaponType || weaponType === "Hybrid") {
                this.damage *= weapon.getDamage();
            }
        }
    }

}

class MagicAttack extends Attack {
    constructor(name, damage) {
        super(name, damage, "Magic");
    }

    getDamage() {
        return {
            magic_damage: this.damage,
            physical_damage: 0
        }
    }

}

class PhysicalAttack extends Attack {
    constructor(name, damage) {
        super(name, damage, "Physical");
    }
    getDamage() {
        return {
            magic_damage: 0,
            physical_damage: this.damage
        }
    }
}
class HybridAttack extends Attack {
    constructor(name, magic_damage, physical_damage) {
        super(name, magic_damage, "Hybrid");
        this.physical_damage = physical_damage;
        this.magic_damage = magic_damage;
    }
    getDamage() {
        return {
            magic_damage: this.magic_damage,
            physical_damage: this.physical_damage
        }
    }
    applyStats(weapon, stats) {
        this.magic_damage *= (1 + stats.intelligence / 100 + 0.5 * stats.dexterity / 100);
        this.physical_damage *= (1 + stats.strength / 100 + 0.5 * stats.dexterity / 100);

        if (weapon) {
            const weaponType = weapon.attackType;
            if (weaponType === "Hybrid") {
                this.magic_damage *= weapon.getDamage();
                this.physical_damage *= weapon.getDamage();
            }
            else if (weaponType === "Physical") {
                this.physical_damage *= weapon.getDamage();
            }
            else if (weaponType === "Magic") {
                this.magic_damage *= weapon.getDamage();
            }
        }
    }
}



module.exports = { Attack, MagicAttack, PhysicalAttack, HybridAttack };