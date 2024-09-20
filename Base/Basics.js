
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

class Weapon {
    constructor(name, damage, attackType) {
        this.name = name;
        this.damage = damage;
        this.attackType = attackType;
    }
}

class Equipament {
    constructor(name) {
        this.name = name;
    }
}

class Consumable {
    constructor(name) {
        this.name = name;
    }
    use() {
        //Abstract Method
        throw new Error("Method not implemented.");
    }
}

class Unit {
    constructor(health, armor, magic_resist) {
        this.health = health;
        this.armor = armor;
        this.magic_resist = magic_resist;
        this.attack = 1;
        this.magic_attack = 1;
        this.dexterity = 1;
        if (health <= 0) {
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

}
module.exports = { Attack, Weapon, Equipament, Consumable, Unit, rollDice };

