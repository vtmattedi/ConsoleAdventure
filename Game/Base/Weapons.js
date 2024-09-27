// Static class to generate weapons
const { DamageType } = require('./DamageTypes')

class Weapon {
    static weaponNames = [
        "Shadowblade", "Dragonfang", "Stormbreaker", "Frostmourne", "Soulreaver",
        "Doomhammer", "WhisperingDagger", "ObsidianAxe", "ElvenBow", "PhoenixClaw",
        "Moonblade", "Windshear", "Thunderstrike", "Ironfury", "Nightshade",
        "HellfireSpear", "Bloodthirst", "GleamingSword", "MysticStaff", "InfernalAxe",
        "Lightbringer", "CelestialHammer", "Flameheart", "Ghoulblade", "Runebinder",
        "ArcaneWand", "Griffon'sTalon", "TitanMaul", "Serpentstrike", "Deathbringer"
    ];
    static getRandomDamage() {
        return (Math.random() * (2.00 - 1.00) + 1.00).toFixed(2);
    }
    static getRandomAttackType() {
        const randomChance = Math.random();
        const HybridChance = 0.1;
        if (randomChance < 0.1) {
            return DamageType.Hybrid;
        } else if (randomChance < HybridChance + (1 - HybridChance) / 2) {
            return DamageType.Magic;
        } else {
            return DamageType.Physical;
        }
    }
    static weapons = [];
    static getMaxWeaponLength = () => {
        let max = 0;
        for (const weapon of Weapon.weapons) {
            if (weapon.name.length > max) {
                max = weapon.name.length;
            }
        }
        return max;
    };
    static genWeapons = () => {
        for (let i = 0; i < 30; i++) {
            const name = Weapon.weaponNames[i];
            const damage = Weapon.getRandomDamage();
            const attackType = Weapon.getRandomAttackType();
            const stats = {
                strength: Math.floor(Math.random() * 10) + attackType === DamageType.Physical ? 2 : 0,
                intelligence: Math.floor(Math.random() * 10) + attackType === DamageType.Magic ? 2 : 0,
                dexterity: Math.floor(Math.random() * 10) + attackType === DamageType.Hybrid ? 4 : 0
            };
            Weapon.weapons.push(new Weapon(name, damage, attackType, stats));
        }
        return Weapon.weapons;
    }
    static genRandomWeapon = (level) => {
        if (Weapon.weapons.length <= 0)
            Weapon.genWeapons()
        const seed = Math.floor(Math.random(Weapon.weapons.length - 1))
        let w = Weapon.weapons[seed];
        const stats = {
            strength: Math.floor(Math.random() * 10 + level) + w.attackType === DamageType.Physical ? 2 : 0,
            intelligence: Math.floor(Math.random() * 10 + level) + w.attackType === DamageType.Magic ? 2 : 0,
            dexterity: Math.floor(Math.random() * 10 + level) + w.attackType === DamageType.Hybrid ? 4 : 0
        };
        w.stats = stats
        return w
    }

    #name; // {get; private set;}
    //Damage need to be public for now
    #attackType;// {get; private set;}
    //Stats need to be public for now
    constructor(name, damage, attackType, stats) {
        this.#name = name; // Name of the weapon
        this.damage = damage; // Damage of the weapon
        this.#attackType = attackType; // Damage type of the weapon
        //stats may need to be changed after generation
        if (typeof stats === 'undefined') {
            stats = {
                strength: 0,
                intelligence: 0,
                dexterity: 0
            };
        }
        this.stats = stats;
    }

    get name() {
        return this.#name;
    }

    get attackType() {
        return this.#attackType;
    }

}

class WeaponBuilder 
{
    constructor() {
        this.name = "";
        this.damage = 0;
        this.attackType = DamageType.Physical;
        this.stats = {
            strength: 0,
            intelligence: 0,
            dexterity: 0
        };
    }
    withName(name) {
        if (typeof name !== 'string')
            throw new TypeError('Invalid name');
        this.name = name;
        return this;
    }
    withDamage(damage) {
        if (typeof damage !== 'number')
            throw new TypeError('Invalid damage');
        this.damage = damage;
        return this;
    }
    withAttackType(attackType) {
        if (!Object.values(DamageType).includes(attackType))
            throw new TypeError('Invalid attack type');
        this.attackType = attackType;
        return this;
    }
    withStats(stats) {
        this.stats = stats;
        return this;
    }
    build() {
        return new Weapon(this.name, this.damage, this.attackType, this.stats);
    }
}

module.exports = { Weapon, WeaponBuilder};