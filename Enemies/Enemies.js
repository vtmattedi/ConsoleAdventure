const { Unit } = require('../Base/Unit.js');
const ConsoleImpl = require('../Base/ConsoleHelp.js');
const { DevMode } = require('../Base/DevMode.js');
const CH = new ConsoleImpl.ConsoleImplementation_x86();
const Colors = ConsoleImpl.DefaultColors;
const { EnemyUtils } = require('./EnemyUtils.js');
const { Potion } = require('../Base/Consumables.js');
const { GameColors } = require('../Base/GameColors.js');
const { Equipament } = require('../Base/Equipament.js');
const { Weapon } = require('../Base/Weapons.js');

class Enemy extends Unit {
    // Should not be  created without a type
    constructor(name, maxHealth, level, stats) {
        const armor = EnemyUtils.genArmor(level);
        super(maxHealth, armor.armor, armor.magic_resist);
        this.name = name;
        this.level = level;
        this.loot = [];
        this.xp_drop = level * 10;
        if (stats) {
            this.setStats(stats.strength, stats.intelligence, stats.dexterity);
        }
    }

    randomAttack() {
        if (this.attacks.length == 0)
            throw new Error("No attacks available");
        let seed = Math.floor(Math.random() * (this.attacks.length - 1));
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

        line = CH.hcenter(line, width + 2, "-");
        lines.push(line);
        line = this.isDead() ? `Dead` : `HP: ${this.health}/${this.maxHealth}`;
        line = CH.hcenter(line, width, " ");
        lines.push(line);
        const hp_percent = Math.round(this.health / this.maxHealth * 100);
        const hp_health = Math.ceil(hp_percent * 0.01 * (width - 2));
        const missing_hp = (width - 2) - hp_health;

        line = `[${CH.insert_color(Colors.RED, "=".repeat(Math.min(missing_hp, width - 2)))}${CH.insert_color(Colors.GREEN, "=".repeat(Math.max(hp_health, 0)))}]`;
        lines.push(line);

        line = `Str: ${this.strength} Int: ${this.intelligence} Dex: ${this.dexterity}`;
        line = CH.hcenter(line, width, " ");
        lines.push(line);
        line = `Armor: ${this.armor} MR: ${this.magic_resist}`;
        line = CH.hcenter(line, width, " ");
        lines.push(line);
        if (DevMode.getInstance().value) {
            line = `[${CH.insert_color(ConsoleImpl.DefaultColors.custom_colors(53), "Loot")}]`;
            line = CH.hcenter(line, width, " ");
            lines.push(line);
            if (this.loot.length > 0) {
                for (const loot of this.loot) {
                    let color = Colors.WHITE;
                    if (loot instanceof Potion) {
                        color = loot.color;
                    }
                    else if (loot instanceof Equipament) {
                        color = GameColors.getEquipamentColor(loot);
                    }
                    else if (loot instanceof Weapon) {
                        color = GameColors.weapon_colors.find(item => item.text === loot.attackType).color;
                    }

                    line = CH.insert_color(color, loot.name);
                    line = CH.hcenter(line, width, " ");
                    lines.push(line);
                }
            }
            else 
            {
                line = "<No loot>";
                line = CH.hcenter(line, width, " ");
                lines.push(line);
            }
            line = CH.insert_color(Colors.LIGHTMAGENTA_EX, "Xp Drop: ") + this.xp_drop
            line = CH.hcenter(line, width, " ");
            lines.push(line);
           
        }
        lines.push("-".repeat(width + 2))


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
        this.attacks = EnemyUtils.genAtkPool([3, 0, 0], level);
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
        this.attacks = EnemyUtils.genAtkPool([2, 2, 1], level);
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
        this.attacks = EnemyUtils.genAtkPool([3, 2, 0], level);
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
        this.attacks = EnemyUtils.genAtkPool([2, 0, 0], level);
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