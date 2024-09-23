const { Unit } = require('../Base/Basics');
const CH = require('../Base/ConsoleHelp');
const Weapons = require('../Base/Weapons');
const Equipament = require('../Base/Equipament');
const Consumables = require('../Base/Consumables');
const Attacks = require('../Base/Attack');

const width = process.stdout.columns;

const MAX_EQUIPAMENT = 2;
const MAX_CONSUMABLES = 5;
class Player extends Unit {
    #devMode = false;
    constructor(name) {
        super(20, 1, 1);
        name = name.trim();
        name = name.toLowerCase();
        if (name.length > 0)
            name = name[0].toUpperCase() + name.substring(1);

        this.name = name;
        this.level = 1;
        this.exp = 0;
        this.xp_to_next_level = 100;
        this.weapon = new Weapons.Weapon('Fists', 1, 'Physical');
        this.equipament = [];
        this.consumables = [];
        this.attacks = [];

    }



    attackTarget(target) {
        let physical_weapon = this.weapon.attackType === 'Physical';
        let magic_weapon = this.weapon.attackType === 'Magic';
        let player_attack =
        {
            Physical: this.attack,
            Magic: this.magic_attack
        }
        if (physical_weapon) {
            player_attack.Physical *= this.weapon.damage;

        }
        else if (magic_weapon) {
            player_attack.Magic *= this.weapon.damage;
        }
        const damage = {
            Physical: this.attack * this.weapon.damage,
            Magic: this.magic_attack * this.weapon.damage
        }
    }
    gainExp(amount) {
        this.exp += amount;
        console.log(`${this.name} has gained ${amount} experience points!`);
        if (this.exp >= 100) {
            this.levelUp();
            this.exp -= 100;
        }
    }
    levelUp() {
        // Abstract Method
        // throw new Error("Not implemented");
        this.level++;
        this.xp_to_next_level += 100;
        this.maxHealth += 20;
        this.health = this.maxHealth;
    }
    printInfo() {
        {
            console.log(this.PlayerInfo())
        }
    }

    PlayerInfo(player_class) {
        /*  ------------------- Name (Class) lv ------------------------------------
    Weapon:         Health: 100%       Xp: 10/1000       items:       Skill:
    


        */
        const weap = CH.center(`Weapon:${Weapons.getMaxWeaponLength()}`, Weapons.getMaxWeaponLength(), '-');

        const equip = CH.center(`Equip:${Equipament.getMaxEquipamentNameLength()}`, Equipament.getMaxEquipamentNameLength(), '+');
        const ds = 'Armor: 100 +100'.length;
        const info = 'hp: 10000(100%)'.length;
        const defStats = CH.center(`DefStats:${ds}`, ds, '-');
        const bag = CH.center(`Bag:${Consumables.getMaxConsumableName()}`, Consumables.getMaxConsumableName(), '.');
        const info_str = CH.center(`Info:${info}`, info, '+');
        //return weap + defStats + equip + bag + info_str + '\n';

        const padding = 3;
        const slot = (name, value, pad = true) => {
            return CH.center(`${name}: ${value}`, value, '-') + ' '.repeat(pad ? padding : 0);;
        }
        const final = slot("Weap/Armor", 27) + slot("Health", 15) + slot("Stats", 15) + slot("bag", 15, false)
        const slot_sizes = [27, 17, 18, 17];
        const size = [...slot_sizes, padding * 3].reduce((a, b) => a + b, 0);

        const chars = ['-', '*', '=', '+'];
        const createSlot = (text, index) => {

            let res = CH.hcenter(text, slot_sizes[index], this.#devMode ? chars[index] : ' ') + ' '.repeat(index < 3 ? padding : 0);;
            return res
        }

        let lines = [];

        const hp = this.health / this.maxHealth * 100
        const hp_str = `${CH.hcenter(hp.toFixed(0), 3, " ", 1)}`;
        const getInfo = (line) => {
            if (line === 0)
                if (this.isDead())
                    return CH.insert_color(CH.Colors.RED,`Dead`);
                else
                    return `Hp: ${CH.hcenter(this.health.toString(), 5, " ", 2)} (${hp_str}%)`;
            else if (line === 1) {
                const hp_percent = Math.min(Math.max(Math.round(this.health / this.maxHealth * 100), 0),100);
                const cut_off = Math.ceil(hp_percent * 0.01 * slot_sizes[1] - 2);
                const missing_hp = slot_sizes[1] - 2 - cut_off;
                return `|${CH.insert_color(CH.Colors.BG_RED, " ".repeat(Math.min(missing_hp, slot_sizes[1] -2)))}${CH.insert_color(CH.Colors.BG_GREEN, " ".repeat(cut_off > 0 ? cut_off : 0))}|`;

            }
            else if (line === 2)
                return `Xp: ${CH.hcenter(this.exp.toString(), 5, " ", 2)}/${CH.hcenter(this.xp_to_next_level.toString(), 5, " ", 1)}`;
            else if (line === 3) {
                const xp_percent = Math.round(this.exp / this.xp_to_next_level * 100);
                const cut_off = Math.ceil(xp_percent * 0.01 * (slot_sizes[1] - 2));
                const missing_xp = (slot_sizes[1] - 2) - cut_off;
                return `|${CH.insert_color(CH.custom_colors(54, true), " ".repeat(cut_off))}${" ".repeat(missing_xp)}|`;

            }

            else
                return "";
        }



        let bonusStats = [0, 0, 0, 0, 0]
        bonusStats[0] = this.weapon.getStats()["strength"];
        bonusStats[1] = this.weapon.getStats()["intelligence"];
        bonusStats[2] = this.weapon.getStats()["dexterity"];
        this.equipament.forEach(equip => {
            bonusStats[3] += equip.getDefense()["armor"];
            bonusStats[4] += equip.getDefense()["magic_resist"];
        });

        const getStats = (line) => {
            const stats_names = ["Str", "Int", "Dex", "Armor", "MR"];
            const current_stats = [this.strength, this.intelligence, this.dexterity, this.armor, this.magic_resist];

            if (line < stats_names.length) {
                const stats_val = CH.hcenter(current_stats[line].toString(), 3, " ", 2);
                const bonus = bonusStats[line] > 0 ? " +" + bonusStats[line].toString().padEnd(3) : " ".repeat(2 + 3);
                return `${CH.hcenter(stats_names[line], 5, " ", 2)}:${stats_val}${bonus}`; /*Str, int, Dex, Armor, MR*/
            }
            else
                return "";

            /*Str, int, Dex, Armor, MR*/
        }
        const getEquip = (index) => {
            if (index === 0) {
                if (this.#devMode) {
                    let stats = "";
                    for (const key in this.weapon.getStats()) {
                        stats += this.weapon.getStats()[key] + ",";
                    }
                    stats = stats.substring(0, stats.length - 1);
                    return this.weapon.name + stats;
                }
                return `${this.weapon.name} (${this.weapon.getDamage()})`;
            }
            else if (index < MAX_EQUIPAMENT + 1)
                if (this.equipament[index - 1]) {
                    if (this.#devMode) {
                        let stats = "";
                        for (const key in this.equipament[index - 1].getDefense()) {
                            stats += this.equipament[index - 1].getDefense()[key] + ",";
                        }
                        stats = stats.substring(0, stats.length - 1);
                        return this.equipament[index - 1].name + " " + stats;
                    }
                    else
                        return this.equipament[index - 1].name;
                }
                else
                    return "<Armor Slot>";
            else return "";
        }
        //console. log (CH.center(`${this.name} (${player_class}) lv: ${this.level}`,size,'-'));
        const bags = ["Bag:", ...this.consumables.map(item => item.name)];
        lines.push(CH.center(` ${this.name} (${player_class}) lv: ${this.level} `, size, '-'));
        for (let i = 0; i < 6; i++) {
            lines.push(createSlot(getEquip(i), 0) + createSlot(getInfo(i), 1) + createSlot(getStats(i), 2) + createSlot(bags[i] || "", 3));
        }
        lines.push("-".repeat(size));

        //Centerlines;
        const width = process.stdout.columns;
        lines = lines.map(line => CH.hcenter(line, width));
        //Colors

        //Class Color
        lines[0] = lines[0].replace(player_class, CH.insert_color(CH.class_colors.find(item => item.text === player_class).color, player_class));
        //Hp Color
        const hp_color = hp > 50 ? CH.hp_colors.find(item => item.text === "High").color : CH.hp_colors.find(item => item.text === "Low").color;
        lines[1] = lines[1].replace(hp_str, CH.insert_color(hp_color, hp_str));
        //Weapon Color
        lines[1] = lines[1].replace(this.weapon.name, CH.insert_color(getWeaponColor(this.weapon), this.weapon.name));

        //Equipament Color
        for (let i = 2; i < 4; i++) {

            if (this.equipament[i - 2])
                lines[i] = lines[i].replace(this.equipament[i - 2].name, CH.insert_color(getEquipColor(this.equipament[i - 2]), this.equipament[i - 2].name));
        }

        //Stats Color
        for (let i = 0; i < 5; i++) {
            if (bonusStats[i] > 0) {
                lines[i + 1] = lines[i + 1].replace("+" + bonusStats[i], CH.insert_color(CH.stats_colors[i].color, "+" + bonusStats[i]));
            }



        }

        //Items Color
        // for (let i = 0; i < 6; i++) {
        //     if (bags[i])
        //         lines[i] = lines[i].replace(bags[i], CH.insert_color(CH.consumable_colors.find(item => item.text === bags[i]).color, bags[i]));
        // }

        return lines.join('\n');

    }

    useConsumable(itemIndex) {
        if (itemIndex < 0 || itemIndex >= this.consumables.length) {
            throw new Error("Invalid item index");
        }
        const item = this.consumables[itemIndex];
        item.use();
        this.consumables.splice(itemIndex, 1);
    }
    findConsumable(consumable) {
        if (this.consumables.length < MAX_CONSUMABLES) {
            this.consumables.push(consumable);
        }
    }

    findWeapon(weapon) {
        const choice = CH.SelectValue(["Equip: " + weapon.name, "Toss it away"], {
            start: 0,
            colors: [{ text: weapon.name, color: getWeaponColor(weapon) }]
        }, true, false);
        if (choice === 0)
            this.weapon = weapon;

    }
    selectAttack() {
        const atk_options = [...this.attacks.map(item => item.name), "Back"];
        const colors = this.attacks.map(item => {
            return {
                text: item.name,
                color: getWeaponColor(item)
            }
        }
        );

        const choice = CH.SelectValue(atk_options, {
            start: 0,
            colors: colors
        }, true, false);
        if (choice === this.attacks.length)
            return -1;
        return choice;

    }
    findEquipament(equipament) {
        console.log("You found a " + CH.insert_color(getEquipColor(equipament), equipament.name) + "!");
        const max_equip = CH.hcenter("You can only have carry 2 equipament:", width)
        const opts = ["Equip: " + equipament.name, "Toss it away"];

        const colors = [...this.equipament, equipament].map(item => {
            return {
                text: item.name,
                color: getEquipColor(item)
            }
        }
        );


        if (this.equipament.length >= MAX_EQUIPAMENT) {
            const max_opts = [...this.equipament.map(item => "Drop: " + item.name), "Leave " + equipament.name + " There"];
            const choice = CH.SelectValue(max_opts, {
                start: 0,
                colors: colors
            }, true, false);
            if (choice < 2) {
                this.equipament[choice] = equipament;
            }
        }
        else {
            const choice = CH.SelectValue(opts, {
                start: 0,
                colors: colors
            }, true, false);
            if (choice === 0) {
                this.equipament.push(equipament);
            }
        }
    }
}
const getEquipColor = (equipament) => {
    if (equipament instanceof Equipament.MagicalArmor)
        return CH.equip_colors.find(item => item.text === "MagicArmor").color;
    else if (equipament instanceof Equipament.Amulet)
        return CH.equip_colors.find(item => item.text === "Amulet").color;
    else
        return CH.equip_colors.find(item => item.text === "Armor").color;
    ;
};

const getWeaponColor = (weapon) => {
    if (weapon.attackType === 'Physical')
        return CH.weapon_colors.find(item => item.text === "Physical").color;
    else if (weapon.attackType === 'Magic')
        return CH.weapon_colors.find(item => item.text === "Magic").color;
    else {
        return CH.weapon_colors.find(item => item.text === "Hybrid").color;
    }


}


const getAttackColor = (attack) => {
    if (attack.attackType === 'Physical')
        return CH.weapon_colors.find(item => item.text === "Physical").color;
    else if (attack.attackType === 'Magic')
        return CH.weapon_colors.find(item => item.text === "Magic").color;
    else {
        return CH.weapon_colors.find(item => item.text === "Hybrid").color;
    }
}


module.exports = Player;