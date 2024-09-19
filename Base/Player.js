const {Weapon, Unit} = require('./Basics');
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
}

module.exports = Player;