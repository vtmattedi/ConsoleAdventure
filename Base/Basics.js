
rollDice = (sides) => {
    return Math.floor(Math.random() * sides) + 1;
}

// Should be an Interface but Will switch to TS at this point
class Attack {
    constructor(damage, attackType) {
        this.damage = damage;
        this.attackType = attackType;
    }
}


class Unit {
    combatBuffs = [];
    constructor(maxHealth, armor, magic_resist) {
        this.maxHealth = maxHealth;
        this.health = maxHealth;
        this.armor = armor;
        this.magic_resist = magic_resist;
        this.strength = 1;
        this.intelligence = 1;
        this.dexterity = 1;
        if (maxHealth <= 0) {
            throw new TypeError("Cannot create a dead unit");
        }
    }
    setStats(attack, magic_attack, dexterity) {
        this.attack = attack;
        this.magic_attack = magic_attack;
        this.dexterity = dexterity;
    }
    getStats() {
        return { attack: this.attack, magic_attack: this.magic_attack, dexterity: this.dexterity };
    }
    getBuffsStats() {
        let stats = { attack: 0, magic_attack: 0, dexterity: 0 };
        for (const buff of this.combatBuffs) {
            stats.attack += buff.attack;
            stats.magic_attack += buff.magic_attack;
            stats.dexterity += buff.dexterity;
        }
    }

}


module.exports = { Attack, Unit, rollDice };

