import { DefaultColors } from "./ConsoleHelp.js";

class Consumable {
    #name;
    #color;
    constructor(name, color) {
        if (typeof name !== "string") {
            throw new Error("Invalid name type");
        }
        if (typeof color !== "string" && typeof color !== "number") {
            throw new Error("Invalid color type");
        }
        this.#name = name;
        this.#color = color;
    }
    get name() {
        return this.#name;
    }
    get color() {
        return this.#color;
    }
    use() {
        //Abstract Method
        throw new Error("Method not implemented.");
    }
    getColor() {
        return this.color;
    }
}

/*
* Potion types = Health, Combat, Utility
*/
class Potion extends Consumable {
    #value;//{get; private set};
    constructor(name, value, color) {
        super(name, color);
        if (typeof value !== "number") 
            throw new Error("Invalid value type");
        this.#value = value;
    }
    get value() {
        return this.#value;
    }
}

//only hp potions for now
class HealthPotion extends Potion {
    constructor(name, health) {
        super(name, health, DefaultColors.RED);
    }
    use() {
        return {
            hp: this.value
        };
    }
}

// class CombatPotion extends Potion {
//     #stats;
//     constructor(name, stats) {
//         super(name);
//         this.#stats = stats;
//     }
//     use() {
//         return{
//             stats: this.#stats
//         };
//     }
// }

// class Utility extends Consumable {
//     constructor(name) {
//         super(name);
//     }
// }

// class CombatUtility extends Utility {
//     constructor(name, attack) {
//         super(name);
//     }
// }

// class OffCombatUtility extends Utility {
//     constructor(name) {
//         super(name);
//     }
//     use() {
//         //Abstract Method
//         throw new Error("Method not implemented.");
//     }
// }


// const ConsumablesNames = [
//     'Health Potion',
//     'Dex. Potion',
//     'Str. Potion',
//     'Int. Potion',
//     'MR Potion',
//     'Armor Potion',
//     'Lucky Dice',
//     'Magic Dust',
//     'Magic Scroll',
//     'Magic Map',
// ]

// const getMaxConsumableName = () => {
//     return Math.max(...ConsumablesNames.map(name => name.length));
// }

export
{
    Consumable,
    Potion,
    HealthPotion,
};
