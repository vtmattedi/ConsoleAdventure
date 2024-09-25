const {DamageType} = require('./DamageTypes')


class Weapon {
    constructor(name, damage, attackType, stats) {
        this.name = name;
        this.damage = damage;
        this.attackType = attackType;
        if(typeof stats === 'undefined') {
            stats = {
                strength: 0,
                intelligence: 0,
                dexterity: 0
            };
        }
        this.stats = stats;
    }
    
    getDamage() {
        return this.damage;
    }
    getStats() {
        return this.stats;
    }
}
const weaponNames = [
    "Shadowblade", "Dragonfang", "Stormbreaker", "Frostmourne", "Soulreaver", 
    "Doomhammer", "WhisperingDagger", "ObsidianAxe", "ElvenBow", "PhoenixClaw",
    "Moonblade", "Windshear", "Thunderstrike", "Ironfury", "Nightshade",
    "HellfireSpear", "Bloodthirst", "GleamingSword", "MysticStaff", "InfernalAxe",
    "Lightbringer", "CelestialHammer", "Flameheart", "Ghoulblade", "Runebinder",
    "ArcaneWand", "Griffon'sTalon", "TitanMaul", "Serpentstrike", "Deathbringer"
];

const attackTypes = ["Physical", "Magic", "Hybrid"];

function getRandomDamage() {
    return (Math.random() * (2.00 - 1.00) + 1.00).toFixed(2);
}

function getRandomAttackType() {
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

const weapons = [];

for (let i = 0; i < 30; i++) {
    const name = weaponNames[i];
    const damage = getRandomDamage();
    const attackType = getRandomAttackType();
    const stats = {
        strength: Math.floor(Math.random() * 10) + attackType === "Physical" ? 2 : 0,
        intelligence: Math.floor(Math.random() * 10) + attackType === "Magic" ? 2 : 0,
        dexterity: Math.floor(Math.random() * 10) + attackType === "Hybrid" ? 4 : 0
    };
    weapons.push(new Weapon(name, damage, attackType, stats));
}

const getMaxWeaponLength = () => {
    let max = 0;
    for (const weapon of weapons) {
        if (weapon.name.length > max) {
            max = weapon.name.length;
        }
    }
    return max;
};


// Export the array and MAX_WEAPON_LENGTH
module.exports = { Weapon, getMaxWeaponLength, weapons };