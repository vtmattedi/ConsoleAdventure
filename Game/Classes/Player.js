const { Unit } = require('../Base/Unit.js');
const ConsoleImpl = require('../Base/ConsoleHelp.js');
const CH = new ConsoleImpl.ConsoleImplementation_x86();
const Colors = ConsoleImpl.DefaultColors;
const { GameColors } = require('../Base/GameColors.js')
const Weapons = require('../Base/Weapons');
const Equipament = require('../Base/Equipament');
const Consumables = require('../Base/Consumables');
const Attacks = require('../Base/Attack');
const { DamageType } = require('../Base/DamageTypes.js');
const { DevMode } = require('../Base/DevMode.js');

class Player extends Unit {
    static #MAX_EQUIPAMENT = 2 //{get; private set;}
    static #MAX_CONSUMABLES = 5 //{get; private set;}
    static #getEquipColor = (equipament) => {
        if (equipament instanceof Equipament.MagicalArmor)
            return GameColors.equip_colors.find(item => item.text === "MagicArmor").color;
        else if (equipament instanceof Equipament.Amulet)
            return GameColors.equip_colors.find(item => item.text === "Amulet").color;
        else
            return GameColors.equip_colors.find(item => item.text === "Armor").color;
        ;
    };

    static #getWeaponColor = (weapon) => {
        if (!(weapon instanceof Weapons.Weapon))
            throw new Error(weapon + " is not a Weapon");
        return GameColors.weapon_colors.find(item => item.text === weapon.attackType).color || Colors.BG_CYAN;
    }

    static #getAttackColor = (attack) => {
        if (!(attack instanceof Attacks.Attack))
            throw new Error(attack + " is not an Attack");
        return GameColors.weapon_colors.find(item => item.text === attack.attackType).color;
    }
    #name;
    #level;
    #xp;
    #xp_to_next_level;
    #weapon;
    #equipaments = []; // no setter, use array funcitons
    #consumables = []; // no getter, use array functions
    constructor(name) {
        super(20, 1, 1);
        //Capitalize
        name = name.trim();
        name = name.toLowerCase();
        if (name.length > 0)
            name = name[0].toUpperCase() + name.substring(1);

        this.#name = name;
        this.#level = 1;
        this.#xp = 0;
        this.#xp_to_next_level = 100;
        this.#weapon = new Weapons.WeaponBuilder()
            .withName('Fists')
            .withDamage(1)
            .withAttackType(DamageType.Physical)
            .build();

    }
    ///Setter and Getters

    set name(value) {
        if (typeof value === "string")
            this.#name = value;
        else
            throw new Error("Invalid Name");
    }

    get name() {
        return this.#name;
    }

    set level(value) {
        if (typeof value === "number")
            this.#level = value;
        else
            throw new Error("Invalid Level");
    }
    get level() {
        return this.#level;
    }

    set exp(value) {
        if (typeof value === "number")
            this.#xp = value;
        else
            throw new Error("Invalid Experience");
    }
    get exp() {
        return this.#xp;
    }

    set xp_to_next_level(value) {
        if (typeof value === "number")
            this.#xp_to_next_level = value;
        else
            throw new Error("Invalid Experience");
    }
    get xp_to_next_level() {
        return this.#xp_to_next_level;
    }

    get weapon() {
        return this.#weapon;
    }
    set weapon(value) {
        if (value instanceof Weapons.Weapon)
            this.#weapon = value;
        else
            throw new Error("Invalid Weapon");
    }

    get equipaments() {
        return this.#equipaments;
    }

    get consumables() {
        return this.#consumables;
    }

    get MAX_EQUIPAMENT() {
        return Player.#MAX_EQUIPAMENT;
    }
    get MAX_CONSUMABLES() {
        return Player.#MAX_CONSUMABLES;
    }
    getClass() {
        //Abstract Method
        //Implement in subclasses
        throw new Error("Method not implemented");
    }
    /*
    Attack target with a specific attack from the attack pool
    @param atk_index Index of the attack in the attack pool
    @param target Unit to attack
      */
    attackTarget(atk_index, target) {
        if (!(target instanceof Unit))
            throw new Error("Cant target a non Unit")
        if (atk_index > this.attacks.length - 1 || atk_index < 0)
            throw new Error("Attack Index outside boundries")
        if (this.attacks.length < 1)
            throw new Error("Empty Attack pool")
        return target.takeDamage(this.attacks[atk_index].calculateDamage(this.getStats(), this.#weapon));
    }
    gainXp(amount) {
        this.#xp += amount;
        if (this.#xp >= this.#xp_to_next_level) {
            this.#xp = this.#xp - this.#xp_to_next_level;
            this.levelUp();
            return true;
        }
        return false;
    }
    //Base level up
    //Implement stats increase and
    //new attacks in the subclasses
    levelUp() {
        this.#level++;
        this.#xp_to_next_level += 100;
        this.maxHealth += 20;
        this.health = this.maxHealth;
    }
    //Prints player info
    printInfo() {
        {
            CH.print(this.playerInfo())
        }
    }

    //Generates player info as a string
    playerInfo(player_class) {

        const padding = 3;
        const slot = (name, value, pad = true) => {
            return CH.hcenter(`${name}: ${value}`, value, '-') + ' '.repeat(pad ? padding : 0);;
        }
        const final = slot("Weap/Armor", 27) + slot("Health", 15) + slot("Stats", 15) + slot("bag", 15, false)
        const slot_sizes = [27, 17, 18, 17];
        const size = [...slot_sizes, padding * 3].reduce((a, b) => a + b, 0);

        const chars = ['-', '*', '=', '+'];
        const createSlot = (text, index) => {

            let res = CH.hcenter(text, slot_sizes[index], DevMode.getInstance().value ? chars[index] : ' ') + ' '.repeat(index < 3 ? padding : 0);;
            return res
        }

        let lines = [];

        const hp = this.health / this.maxHealth * 100
        const hp_str = `${CH.hcenter(hp.toFixed(0), 3, " ", 1)}`;
        const getInfo = (line) => {
            if (line === 0)
                if (this.isDead())
                    return CH.insert_color(Colors.RED, `Dead`);
                else
                    return `Hp: ${CH.hcenter(this.health.toString(), 5, " ", 2)} (${hp_str}%)`;
            else if (line === 1) {
                const hp_percent = Math.min(Math.max(Math.round(this.health / this.maxHealth * 100), 0), 100);
                const cut_off = Math.ceil(hp_percent * 0.01 * slot_sizes[1] - 2);
                const missing_hp = slot_sizes[1] - 2 - cut_off;
                return `|${CH.insert_color(Colors.BG_RED, " ".repeat(Math.min(missing_hp, slot_sizes[1] - 2)))}${CH.insert_color(Colors.BG_GREEN, " ".repeat(cut_off > 0 ? cut_off : 0))}|`;

            }
            else if (line === 2)
                return `Xp: ${CH.hcenter(this.#xp.toString(), 5, " ", 2)}/${CH.hcenter(this.#xp_to_next_level.toString(), 5, " ", 1)}`;
            else if (line === 3) {
                const xp_percent = this.#xp / this.#xp_to_next_level;
                return `|${CH.fillBar(xp_percent, slot_sizes[1] - 2, ` `, Colors.custom_colors(56, true), Colors.BG_BLACK)}|`;

            }

            else
                return "";
        }

        let bonusStats = [0, 0, 0, 0, 0]
        bonusStats[0] = this.#weapon.stats["strength"];
        bonusStats[1] = this.#weapon.stats["intelligence"];
        bonusStats[2] = this.#weapon.stats["dexterity"];
        this.equipaments.forEach(equip => {
            bonusStats[3] += equip.getDefense()["armor"];
            bonusStats[4] += equip.getDefense()["magic_resist"];
        });

        const getStats = (line) => {
            const stats_names = ["Str", "Int", "Dex", "Armor", "MR"];
            const current_stats = [this.strength, this.intelligence, this.dexterity, this.armor, this.magic_resist];

            if (line < stats_names.length) {
                const stats_val = CH.hcenter(String(current_stats[line]), 3, " ", 2);
                const bonus = bonusStats[line] > 0 ? " +" + bonusStats[line].toString().padEnd(3) : " ".repeat(2 + 3);
                return `${CH.hcenter(stats_names[line], 5, " ", 2)}:${stats_val}${bonus}`; /*Str, int, Dex, Armor, MR*/
            }
            else
                return "";

            /*Str, int, Dex, Armor, MR*/
        }
        const getEquip = (index) => {
            if (index === 0) {
                if (DevMode.getInstance().value) {
                    let stats = "";
                    for (const key in this.#weapon.stats) {
                        stats += this.#weapon.stats[key] + ",";
                    }
                    stats = stats.substring(0, stats.length - 1);
                    return this.#weapon.name + stats;
                }
                return `${this.#weapon.name} (${this.#weapon.damage})`;
            }
            else if (index < this.MAX_EQUIPAMENT + 1)
                if (this.equipaments[index - 1]) {
                    if (DevMode.getInstance().value) {
                        let stats = "";
                        for (const key in this.equipaments[index - 1].getDefense()) {
                            stats += this.equipaments[index - 1].getDefense()[key] + ",";
                        }
                        stats = stats.substring(0, stats.length - 1);
                        return this.equipaments[index - 1].name + " " + stats;
                    }
                    else
                        return this.equipaments[index - 1].name;
                }
                else
                    return "<Armor Slot>";
            else return "";
        }


        //console. log (CH.hcenter(`${this.#name} (${player_class}) lv: ${this.#level}`,size,'-'));
        const bags = ["Bag:", ...this.consumables.map(item => item.name)];
        const getBag = (index) => {
            if (index === 0)
                return bags[0];
        
            else if (index  - 1 < this.consumables.length)
            {
                return CH.insert_color(this.consumables[index - 1].color, this.consumables[index - 1].name);
            }
            else 
                return "";
        }
        lines.push(CH.hcenter(` ${this.#name} (${player_class}) lv: ${this.#level} `, size, '-'));
        for (let i = 0; i < 6; i++) {
            lines.push(createSlot(getEquip(i), 0) + createSlot(getInfo(i), 1) + createSlot(getStats(i), 2) + createSlot(getBag(i), 3));
        }
        lines.push("-".repeat(size));

        //Centerlines;
        const width = CH.getWidth();
        lines = lines.map(line => CH.hcenter(line, width));
        //Colors

        //Class Color
        lines[0] = lines[0].replace(player_class, CH.insert_color(GameColors.class_colors.find(item => item.text === player_class).color, player_class));
        //Hp Color
        const hp_color = hp > 50 ? GameColors.hp_colors.find(item => item.text === "High").color : GameColors.hp_colors.find(item => item.text === "Low").color;
        lines[1] = lines[1].replace(hp_str, CH.insert_color(hp_color, hp_str));
        //Weapon Color
        lines[1] = lines[1].replace(this.#weapon.name, CH.insert_color(Player.#getWeaponColor(this.#weapon), this.#weapon.name));

        //Equipament Color
        for (let i = 2; i < 4; i++) {

            if (this.equipaments[i - 2])
                lines[i] = lines[i].replace(this.equipaments[i - 2].name, CH.insert_color(Player.#getEquipColor(this.equipaments[i - 2]), this.equipaments[i - 2].name));
            else
                lines[i] = lines[i].replace("Armor Slot", CH.insert_color(Colors.LIGHTBLACK_EX, "Armor Slot"));
        }

        //Stats Color
        for (let i = 0; i < 5; i++) {
            if (bonusStats[i] > 0) {
                lines[i + 1] = lines[i + 1].replace("+" + bonusStats[i], CH.insert_color(GameColors.stats_colors[i].color, "+" + bonusStats[i]));
            }
        }

     
        return lines.join('\n');

    }

    useConsumable(itemIndex) {
        if (!(typeof itemIndex === "number"))
            throw new TypeError("Item index must be a number");
        if (itemIndex < 0 || itemIndex >= this.consumables.length) {
            throw new Error("Invalid item index");
        }
        const item = this.consumables[itemIndex];
        if (item instanceof Consumables.HealthPotion) {
            this.recoverHealth(item.value);
            this.consumables.splice(itemIndex, 1);
        }
    }

    findConsumable(consumable) {
        if (!(consumable instanceof Consumables.Consumable))
            throw new Error("Consumable must be an instance of Consumable");
        if (this.consumables.length < this.MAX_CONSUMABLES) {
            this.consumables.push(consumable);
        }
    }

    findWeapon(weapon) {
        if (!(weapon instanceof Weapons.Weapon))
            throw new Error("Weapon must be an instance of Weapon");
        CH.print(CH.hcenter("You found a " + CH.insert_color(Player.#getWeaponColor(weapon), weapon.name) + "!", CH.getWidth()));
        CH.print(CH.hcenter("You can only carry one weapon at a time", CH.getWidth()));
        CH.print();//ln
        const choice = CH.SelectValue(["Equip: " + weapon.name, "Toss it away"], {
            start: 0,
            colors: [{ text: weapon.name, color: Player.#getWeaponColor(weapon) }]
        }, true, false);
        if (choice === 0)
            this.#weapon = weapon;
        CH.clear_last_line(3);
    }

    findEquipament(equipament) {
        const phrase = "You found a " + CH.insert_color(Player.#getEquipColor(equipament), equipament.name) + "!";
        CH.print(CH.hcenter(phrase, CH.getWidth()));
        const max_equip = CH.hcenter("You can only have carry 2 equipament:", CH.getWidth());
        if (this.equipaments.length >= this.MAX_EQUIPAMENT)
            CH.print(CH.hcenter(max_equip, CH.getWidth()));
        CH.print();//ln
        const opts = ["Equip: " + equipament.name, "Toss it away"];

        const colors = [...this.equipaments, equipament].map(item => {
            return {
                text: item.name,
                color: Player.#getEquipColor(item)
            }
        }
        );


        if (this.equipaments.length >= this.MAX_EQUIPAMENT) {
            const max_opts = [...this.equipaments.map(item => "Drop: " + item.name), "Leave " + equipament.name + " There"];
            const choice = CH.SelectValue(max_opts, {
                start: 0,
                colors: colors
            }, true, false);
            if (choice < 2) {
                this.equipaments[choice] = equipament;
            }
        }
        else {
            const choice = CH.SelectValue(opts, {
                start: 0,
                colors: colors
            }, true, false);
            if (choice === 0) {
                this.equipaments.push(equipament);
            }
        }

        //Clear 3 lines if max equipament is reached else we only printed 2 lines
        CH.clear_last_line(this.equipaments.length >= this.MAX_EQUIPAMENT ? 3 : 2);
    }

    selectAttack() {
        const atk_options = [...this.attacks.map(item => item.name), "Back"];
        const colors = this.attacks.map(item => {
            return {
                text: item.name,
                color: Player.#getAttackColor(item)
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

}


module.exports = { Player };