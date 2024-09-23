class Weapon {
    constructor(name, damage, attackType) {
        this.name = name;
        this.damage = damage;
        this.attackType = attackType;
    }
    getDamage() {
        return this.damage;
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
        return "Hybrid";
    } else if (randomChance < HybridChance + (1 - HybridChance) / 2) {
        return "Magic";
    } else {
        return "Physical";
    }
}

let weapons = [];

for (let i = 0; i < 30; i++) {
    const name = weaponNames[i];
    const damage = getRandomDamage();
    const attackType = getRandomAttackType();
    weapons.push(new Weapon(name, damage, attackType));
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
module.exports = { Weapon, getMaxWeaponLength };