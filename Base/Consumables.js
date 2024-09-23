const { Module } = require("module");

class Consumable {
    constructor(name) {
        this.name = name;
    }
    use() {
        //Abstract Method
        throw new Error("Method not implemented.");
    }
}
class Potion extends Consumable {
    constructor(name) {
        super(name);
    }
}

class HealthPotion extends Potion {
    #health;
    constructor(name, health) {
        super(name);
        this.#health = health;
    }
    use() {
        return this.#health;
    }
}

class CombatPotion extends Potion {
    #attack;
    constructor(name, attack) {
        super(name);
        this.#attack = attack;
    }
    use() {
        return this.#attack;
    }
}

class Utility extends Consumable {
    constructor(name) {
        super(name);
    }
}

class CombatUtility extends Utility {
    #attack;
    constructor(name, attack) {
        super(name);
        this.#attack = attack;
    }
    use() {
        return this.#attack;
    }
}

class OffCombatUtility extends Utility {
    constructor(name) {
        super(name);
    }
    use() {
        //Abstract Method
        throw new Error("Method not implemented.");
    }
}


const ConsumablesNames = [
    'Health Potion',
    'Dex. Potion',
    'Str. Potion',
    'Int. Potion',
    'MR Potion',
    'Armor Potion',
    'Lucky Dice',
    'Magic Dust',
    'Magic Scroll',
    'Magic Map',
]

const getMaxConsumableName = () => {
    return Math.max(...ConsumablesNames.map(name => name.length));
}

module.exports = 
{
    Consumable,
    HealthPotion,
    CombatPotion,
    Utility,
    CombatUtility,
    OffCombatUtility,
    ConsumablesNames,
    getMaxConsumableName
};
