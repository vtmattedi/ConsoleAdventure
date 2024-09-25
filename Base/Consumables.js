const { Module } = require("module");

class Consumable {
    constructor(name) {
        this.name = name;
    }
    get name() {
        return this.name;
    } 
    set name(value) {
        this.name = value;
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
    get health() {
        return this.#health;
    }
    use() {
        return {
            hp: this.#health
        };
    }
}

class CombatPotion extends Potion {
    #stats;
    constructor(name, stats) {
        super(name);
        this.#stats = stats;
    }
    use() {
        return{
            stats: this.#stats
        };
    }
}

class Utility extends Consumable {
    constructor(name) {
        super(name);
    }
}

class CombatUtility extends Utility {
    constructor(name, attack) {
        super(name);
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
