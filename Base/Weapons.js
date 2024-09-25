const {DamageType} = require('./DamageTypes')


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
        for (const weapon of weapons) {
            if (weapon.name.length > max) {
                max = weapon.name.length;
            }
        }
        return max;
    };
    static genWeapons = ()=>
    {
        for (let i = 0; i < 30; i++) {
            const name = weaponNames[i];
            const damage = getRandomDamage();
            const attackType = getRandomAttackType();
            const stats = {
                strength: Math.floor(Math.random() * 10) + attackType === DamageType.Physical ? 2 : 0,
                intelligence: Math.floor(Math.random() * 10) + attackType === DamageType.Magic ? 2 : 0,
                dexterity: Math.floor(Math.random() * 10) + attackType === DamageType.Hybrid ? 4 : 0
            };
            Weapon.weapons.push(new Weapon(name, damage, attackType, stats));
        }
        return Weapon.weapons;
    }

    static genRandomWeapon = (level) =>
    {
        if (Weapon.weapons.length <= 0);
            Weapon.genWeapons()
        const seed = Math.floor(Math.random(Weapon.weapons.length - 1))
        const stats = {
            strength: Math.floor(Math.random() * 10 + level) + attackType === DamageType.Physical ? 2 : 0,
            intelligence: Math.floor(Math.random() * 10 + level) + attackType === DamageType.Magic ? 2 : 0,
            dexterity: Math.floor(Math.random() * 10 + level) + attackType === DamageType.Hybrid ? 4 : 0
        };
        let w = Weapon.weapons[seed];
        w.stats = stats
        return w
    }
    
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







// Export the array and MAX_WEAPON_LENGTH
module.exports = { Weapon };