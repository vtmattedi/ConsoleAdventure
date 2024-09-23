const { Unit } = require('../Base/Basics.js');
const Attacks = require('../Base/Attack.js');
const CH = require('../Base/ConsoleHelp.js');
const magicAttackNames = [
    "Mystic Blast", "Arcane Surge", "Flame Wave", "Frostbolt", "Shadow Strike",
    "Lightning Bolt", "Void Pulse", "Spirit Lash", "Eldritch Burst", "Mana Storm"
];

const physicalAttackNames = [
    "Sword Slash", "Axe Chop", "Spear Thrust", "Mace Smash", "Orcish Cleave",
    "Hammer Blow", "Frenzied Bite", "Skull Crusher", "Shield Bash", "Brutal Kick"
];

const hybridAttackNames = [
    "Enchanted Blade", "Cursed Arrow", "Stormstrike", "Inferno Fist", "Arcane Slash"
];

// Function to generate attacks
function generateAttacks() {
    const common_attacks = [];
    const special_abilities = [];
    const super_spell = [];

    const default_attack_value = 1;

    // Generate common_attacks: 0 Hybrid, 10 Magic, 10 Physical
    for (let i = 0; i < 10; i++) {
        const magicAttack = new Attacks.MagicAttack(magicAttackNames[i], 1);
        const physicalAttack = new Attacks.PhysicalAttack(physicalAttackNames[i], 1);
        common_attacks.push(magicAttack, physicalAttack);
    }

    // Generate special_abilities: 1 Hybrid, 5 Magic, 4 Physical
    const hybrid1 = new Attacks.HybridAttack(hybridAttackNames[0], 1, 1);
    special_abilities.push(hybrid1);

    for (let i = 0; i < 5; i++) {
        const magicAttack = new Attacks.MagicAttack(magicAttackNames[i], 1);
        special_abilities.push(magicAttack);
    }

    for (let i = 5; i < 9; i++) {
        const physicalAttack = new Attacks.PhysicalAttack(physicalAttackNames[i], 1);
        special_abilities.push(physicalAttack);
    }

    // Generate super_spell: 3 Hybrid, 4 Magic, 3 Physical
    for (let i = 0; i < 3; i++) {
        const hybridAttack = new Attacks.HybridAttack(hybridAttackNames[i], 1, 1);
        super_spell.push(hybridAttack);
    }

    for (let i = 0; i < 4; i++) {
        const magicAttack = new Attacks.MagicAttack(magicAttackNames[i], 1);
        super_spell.push(magicAttack);
    }

    for (let i = 0; i < 3; i++) {
        const physicalAttack = new Attacks.PhysicalAttack(physicalAttackNames[i], 1);
        super_spell.push(physicalAttack);
    }

    return { common_attacks, special_abilities, super_spell };
}

const atk_pool = generateAttacks();


const genAtkPool = (types, level) => {
    let res = [];
    if (!Array.isArray(types) || types.length !== 3)
        throw new TypeError("Types must be an array of 3 elements");
    if (types[0] < 0 || types[1] < 0 || types[2] < 0)
        throw new TypeError("Types must be positive integers");
    if (types[0] + types[1] + types[2] < 1)
        throw new TypeError("At least one attack must be generated");
    if (types[0] > atk_pool["common_attacks"].length || types[1] > atk_pool["special_abilities"].length || types[2] > atk_pool["super_spell"].length)
        throw new TypeError("Not enough attacks to generate");

    for (let i = 0; i < types[0]; i++) {
        const atk = atk_pool["common_attacks"];
        let seed = Math.floor(Math.random() * atk.length);
        while (res.includes(atk[seed])) {
            seed += 1
            if (seed >= atk.length) {
                seed = 0;
            }
        }
        // Generate Attack damage based on level, can't be hybrid here
        atk[seed].damage = level + Math.floor(level / 10 * Math.random() - 0.5);
        res.push(atk[seed]);
    }
    for (let i = 0; i < types[1]; i++) {
        const atk = atk_pool["special_abilities"];
        let seed = Math.floor(Math.random() * atk.length);
        while (res.includes(atk[seed])) {
            seed += 1
            if (seed >= atk.length) {
                seed = 0;
            }
            // Generate Attack damage based on level
            // Hybrid attacks have both magic and physical damage
            if (atk[seed].constructor.name instanceof Attacks.HybridAttack) {
                atk[seed].magic_damage = level + Math.floor(level / 4 * Math.random() - 0.5);
                atk[seed].physical_damage = level + Math.floor(level / 4 * Math.random() - 0.5);
            }
            else
                atk[seed].damage = level + Math.floor(level / 4 * Math.random() - 0.5);
            res.push(atk[seed]);
        }
    }
    for (let i = 0; i < types[2]; i++) {
        const atk = atk_pool["super_spell"];
        let seed = Math.floor(Math.random() * atk.length);
        while (res.includes(atk[seed])) {
            seed += 1
            if (seed >= atk.length) {
                seed = 0;
            }
        }
        if (atk[seed].constructor.name instanceof Attacks.HybridAttack) {
            atk[seed].magic_damage = level + Math.floor(level / 2 * Math.random() - 0.5);
            atk[seed].physical_damage = level + Math.floor(level / 2 * Math.random() - 0.5);
        }
        else
            atk[seed].damage = level + Math.floor(level / 2 * Math.random() - 0.5);
        res.push(atk[seed]);
    }
    return res;
}

const genArmor = (level) => {
    let res =
    {
        armor: level + Math.floor(level / 2 * Math.random() - 0.5),
        magic_resist: level + Math.floor(level / 2 * Math.random() - 0.5),
    }
    return res;
}


class Enemy extends Unit {
    // Should not be  created without a type
    constructor(name, maxHealth, level, stats) {
        const armor = genArmor(level);
        super(maxHealth, armor.armor, armor.magic_resist);
        this.name = name;
        this.level = level;
        this.attacks = [];
        this.loot = [];
        this.xp_drop = level * 10;
        if (stats) {
            this.setStats(stats.strength, stats.intelligence, stats.dexterity);
        }
    }

    getDefence() {
        return { armor: this.armor, magic_resist: this.magic_resist };
    }

    randomAttack() {
        if (this.attacks.length == 0)
            throw new Error("No attacks available");
        let seed = Math.floor(Math.random() * this.attacks.length);
        return this.attacks[seed];
    }

    getDifficulty() {
        throw new Error("Method 'getDifficulty()' must be implemented.");
    }

    generateEnemyInfo() {
        /*
            ------------- [ ] Name lv 5 -------------
            |
            [=====================================]|                       
            |str:                    Armor:         |                     
            |dex                     MR             |
            |int                                    |
            |                                       |
            |                                       |
            |                                       |
            -----------------------------------------
            
            */
        const width = Math.round(CH.getWidth() / 4);
        let lines = [];
        let line = ` [${this.getDifficulty()}] ${this.name} lv ${this.level} `;

        line = CH.hcenter(line, width+2, "-");
        lines.push(line);
        line = this.isDead() ? `Dead` : `HP: ${this.health}/${this.maxHealth}`;
        line = CH.hcenter(line, width, " ");
        lines.push(line);
        const hp_percent = Math.round(this.health / this.maxHealth * 100);
        const hp_health = Math.ceil(hp_percent * 0.01 * (width - 2));
        const missing_hp = (width - 2) - hp_health;

        line = `[${CH.insert_color(CH.Colors.RED, "=".repeat(Math.min(missing_hp, width - 2)))}${CH.insert_color(CH.Colors.GREEN, "=".repeat(Math.max(hp_health, 0)))}]`;
        lines.push(line);

        line = `str: ${this.strength} int: ${this.intelligence} dex: ${this.dexterity}`;
        line = CH.hcenter(line, width, " ");
        lines.push(line);
        line = `Armor: ${this.armor} MR: ${this.magic_resist}`;
        line = CH.hcenter(line, width, " ");
        lines.push(line);
        lines.push("-".repeat(width+2))

        return lines.map((item, index) => {
            if (index !== 0 && index !== lines.length - 1)
                return `|${item}|`;
            else
                return item;
        }).join('\n');
    }
}

class CommonEnemy extends Enemy {
    constructor(name, maxHealth, level, stats) {
        super(name, maxHealth, level, stats);
        this.attacks = genAtkPool([3, 0, 0], level);
    }
    getDifficulty() {
        return "C";
    }
}

class Boss extends Enemy {
    constructor(name, maxHealth, level, stats) {
        super(name, maxHealth, level, stats);
        this.armor = Math.round(this.armor * 1.5);
        this.magic_resist = Math.round(this.magic_resist * 1.5);
        this.attacks = genAtkPool([2, 2, 1], level);
        this.xp_drop = this.xp_drop * 2;

    }
    getDifficulty() {
        return "B";
    }
}

class Elite extends Enemy {
    constructor(name, maxHealth, level, stats) {
        super(name, maxHealth, level, stats);
        this.armor = Math.round(this.armor * 1.2);
        this.magic_resist = Math.round(this.magic_resist * 1.2);
        this.attacks = genAtkPool([3, 2, 0], level);
        this.xp_drop = Math.round(this.xp_drop * 1.5);
    }
    getDifficulty() {
        return "E";
    }
}

class Minion extends Enemy {
    constructor(name, maxHealth, level, stats) {
        super(name, maxHealth, level, stats);
        this.armor = Math.round(this.armor * 0.75);
        this.magic_resist = Math.round(this.magic_resist * 0.75);
        this.attacks = genAtkPool([2, 0, 0], level);
    }
    getDifficulty() {
        return "M";
    }
}

module.exports =
{
    Enemy,
    CommonEnemy,
    Boss,
    Elite,
    Minion,
}