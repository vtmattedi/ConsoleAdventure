const { Unit } = require('../Base/Basics');
const CH = require('../Base/ConsoleHelp');
const Weapons = require('../Base/Weapons');
const Equipament = require('../Base/Equipament');
const Consumables = require('../Base/Consumables');



const MAX_EQUIPAMENT = 2;
const MAX_CONSUMABLES = 5;
class Player extends Unit {
    #devMode = false;
    constructor(name) {
        super(10, 0, 0, 0);
        this.name = name;
        this.level = 1;
        this.exp = 0;
        this.xp_to_next_level = 100;
        this.weapon = new Weapons.Weapon('Fists', 1, 'Physical');
        this.equipament = [];
        this.consumables = [new Consumables.HealthPotion("*".repeat(15))];

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
        throw new Error("Not implemented");
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
        const slot_sizes = [27, 17, 17, 17];
        const size = [...slot_sizes,padding * 3].reduce((a, b) => a + b, 0);

        const chars = ['-', '*', '=', '+'];
        const createSlot = (text, index) => {

                let res = CH.center(text, slot_sizes[index], this.#devMode?chars[index]:' ') + ' '.repeat(index <3?padding:0);;
                return res
        }

        let lines = [];
        const getInfo = (line) => {
            if (line === 0)
                return `Hp: ${CH.hcenter(this.health.toString(),5," ",2)} (${CH.hcenter((this.health / this.maxHealth * 100).toString(), 3, " ", 1)}%)`;
            else if (line === 1)
                return `Xp: ${CH.hcenter(this.exp.toString(), 5, " ", 2)}/${CH.hcenter(this.xp_to_next_level.toString(), 5, " ", 1)}`;
            else
                return "";
        }
        
        const getStats = (line) => {
            const stats_names = [ "Str", "Int", "Dex", "Armor", "MR"];
            const current_stats = [this.strength, this.intelligence, this.dexterity, this.armor, this.magic_resist];
            if (line < stats_names.length  )                
                return `${CH.hcenter(stats_names[line], 5," ",2)}:${CH.hcenter(current_stats[line].toString(),3," ",2)}`; /*Str, int, Dex, Armor, MR*/
            else
                return "";
        
            /*Str, int, Dex, Armor, MR*/
        }
        const getEquip = (index) => {
            if (index === 0)
                return this.weapon.name;
            else if (index < MAX_EQUIPAMENT + 1)
                if (this.equipament[index - 1])
                    return this.equipament[index - 1].name
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
        //Clolors
        lines[0] = lines[0].replace(player_class, CH.insert_color(CH.class_colors.find(item => item.text === player_class).color, player_class));
        lines[1] = lines[1].replace(this.name, CH.insert_color(CH.Colors.YELLOW, this.name));
        // headers = () => 
        // {
        //     let res = "";
        //     for (let i = 0; i < lines[0].length; i++) {
        //         res += padding;
        //     }
        //     return res;
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

    equipWeapon(weapon) {
        this.weapon = weapon;
    }
    equipEquipament(equipament) {
        if (this.equipament.length >= MAX_EQUIPAMENT) {
            throw new Error("Cannot equip more than 2 items");
        }
        this.equipament.push(equipament);
    }
}

module.exports = Player;