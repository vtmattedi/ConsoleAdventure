const {Weapon, Unit} = require('./Basics');
const {hcenter} = require('./ConsoleHelp');

const MAX_EQUIPAMENT = 2;
const MAX_CONSUMABLES = 5;
class Player extends Unit {
    constructor(name) {
        super(10, 0, 0, 0);
        this.name = name;
        this.level = 1;
        this.exp = 0;
        this.xp_to_next_level = 100;
        this.weapon = new Weapon('Fists', 1, 'Physical');
        this.equipament = [];
        this.consumables = [];

    }



    attackTarget(target) {
        let physical_weapon =  this.weapon.attackType === 'Physical';
        let magic_weapon =  this.weapon.attackType === 'Magic';
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

    PlayerInfo() {
        /*  ------------------- Name (Class) lv ------------------------------------
    Weapon:         Health: 100%       Xp: 10/1000       items:       Skill:



*/      
        let lines = [];
        const padding = 5;
        const equipament_size =
        lines.push(`${this.name} (${this.constructor.name}) lv: ${this.level}`);
        
        lines.push(`Weapon:${this.weapon.name}        Health: ${this.health}       Xp: ${this.exp}/${this.xp_to_next_level}       items:`);
        headers = () => 
        {
            let res = "";
            for (let i = 0; i < lines[0].length; i++) {
                res += padding;
            }
            return res;
        }
    }
}

module.exports = Player;