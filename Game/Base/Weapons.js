// Static class to generate weapons
import { DamageType } from './DamageTypes.js';
import { GameColors } from './GameColors.js';

class Weapon {


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

    getColor() {
        if (this.attackType === DamageType.Physical)
            return GameColors.weapon_colors[0].color;
        else if (this.attackType === DamageType.Magic)
            return GameColors.weapon_colors[1].color;
        else
            return GameColors.weapon_colors[2].color;
    }

    getDamage() {
        return this.damage;
    }

}

class WeaponBuilder {
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
        if (typeof attackType !== 'number')
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

class WeaponUtils {
    // Physical Weapons
    static physicalWeapons = [
        "Bloodthirst Axe", "Ironclad Mace", "Bonecrusher Hammer", "Steel Fang Dagger",
        "Warrior's Greatsword", "Orcish Battle Axe", "Knight's Broadsword", "Titan Maul",
        "Savage Cleaver", "Vanguard Pike", "Stormbreaker Spear", "Crimson Edge",
        "Ironclaw Halberd", "Vengeance Blade", "Warhammer of Destruction", "Skullsplitter Axe",
        "Shieldbreaker Mace", "Dreadnought Scimitar", "Dragonslayer Longsword", "Brutal War Axe",
        "Deathbringer Morningstar", "Razorclaw Shortsword", "Steelheart Flail", "Talonblade Saber",
        "Thunderstrike Pike", "Blightwood Staff", "Bonefury Club", "Widowmaker Halberd",
        "Doomguard Lance", "Reaver Blade"
    ];

    // Magical Weapons 
    static magicalWeapons = [
        "Staff of the Arcane", "Wand of Infinite Frost", "Flameweaver Rod", "Crystal Scepter",
        "Orb of the Void", "Lightning Rod of the Stormcaller", "Staff of Ethereal Flames",
        "Frostbound Scepter", "Runescribe Staff", "Soulreaver Wand", "Orb of Shadows",
        "Scepter of Eternal Night", "Staff of Eldritch Power", "Wand of Arcane Whispers",
        "Pyromancer's Torch", "Serpent's Coil Wand", "Moonlight Staff", "Obsidian Orb",
        "Staff of Elemental Fury", "Wand of Forbidden Magics", "Sunfire Scepter",
        "Staff of Radiance", "Necromancer's Skull Wand", "Voidcaller's Staff",
        "Shadowbinder's Orb", "Scepter of Mana Surge", "Iceborn Staff", "Elderwood Staff",
        "Celestial Orb", "Inferno Scepter"
    ];

    // Hybrid Weapons
    static hybridWeapons = [
        "Blazefury Halberd", "Stormbreaker Axe", "Frostbite Sword", "Runeblade of the Ancients",
        "Firebrand Claymore", "Arcane Cleaver", "Soulreaver Scythe", "Shadowsteel Mace",
        "Lightningstrike Warhammer", "Enchanted Greatsword", "Spectral Edge", "Flameborn Pike",
        "Gleaming Runeblade", "Inferno Warhammer", "Voidtouched Scimitar", "Ethereal Dagger",
        "Soulflame Rapier", "Runesmith's Axe", "Arcane Saber", "Thunderfury Spear",
        "Frostfire Sword", "Flamestrike Greataxe", "Voidpiercer Lance", "Magebreaker Warhammer",
        "Stormcaller's Sword", "Shadowsoul Glaive", "Celestial Longsword", "Doomguard Runeblade",
        "Spiritbound Cleaver", "Blightsteel Flail"
    ];

    static getRandomAttackType() {
        const randomChance = Math.random();
        const HybridChance = 0.1;
        if (randomChance < HybridChance) {
            return DamageType.Hybrid;
        } else if (randomChance < HybridChance + (1 - HybridChance) / 2) {
            return DamageType.Magic;
        } else {
            return DamageType.Physical;
        }
    }
    static usedWeaponsNames = [];

    static getNames(attackType) {
        if (attackType === DamageType.Physical) {
            return WeaponUtils.physicalWeapons;
        }
        else if (attackType === DamageType.Magic) {
            return WeaponUtils.magicalWeapons;
        }
        else {
            return WeaponUtils.hybridWeapons;
        }   
    }

    static genRandomWeapon = (level) => {
        const attackType = WeaponUtils.getRandomAttackType();
         
        let nameSeed = Math.floor(Math.random() * (WeaponUtils.getNames(attackType).length - 1))
        while (WeaponUtils.usedWeaponsNames.includes(WeaponUtils.getNames(attackType)[nameSeed])) {
            nameSeed++;
            if (nameSeed >= WeaponUtils.getNames(attackType).length) {
                nameSeed = 0;
            }
        }
        const name = WeaponUtils.getNames(attackType)[nameSeed];
        WeaponUtils.usedWeaponsNames.push(name);
        //not efficient but will do for now with 30-90 elements
        let full = true;
        WeaponUtils.getNames(attackType).forEach(element => {
            full = full && WeaponUtils.usedWeaponsNames.includes(element);
        });
        if (full) {
            WeaponUtils.getNames(attackType).forEach(() => {
                WeaponUtils.usedWeaponsNames.pop();
            });
        }
        const damage = Number((Math.random() + 1 + level / 10).toFixed(2));
        const stats = {
            strength: Math.floor(Math.random() * 5 + level),
            intelligence: Math.floor(Math.random() * 5 + level),
            dexterity: Math.floor(Math.random() * 5 + level)
        };
        if (attackType === DamageType.Physical) {
            stats.strength += 2;
        }
        else if (attackType === DamageType.Magic) {
            stats.intelligence += 2;
        }
        else if (attackType === DamageType.Hybrid) {
            stats.dexterity += 3;
        }
        return (new WeaponBuilder()
            .withName(name)
            .withDamage(damage)
            .withAttackType(attackType)
            .withStats(stats)
            .build());
    }
}

export{ Weapon, WeaponBuilder, WeaponUtils };