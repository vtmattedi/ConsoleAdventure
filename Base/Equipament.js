

class Equipament {
    #name;
    constructor(name) {
        this.#name = name;
    }
    get name() {
        return this.#name;
    }

    //Abstract Method
    getDefense() {
        throw new Error("Method not implemented.");
    }
}

class Armor extends Equipament {
    #armor;
    constructor(name, armor) {
        super(name);
        this.#armor = armor;
    }
    getDefense() {
        return {
            armor: this.#armor,
            magic_resist: 0
        };

    }
}

class Amulet extends Equipament {
    #magic_resist;
    constructor(name, magic_resist) {
        super(name);
        this.#magic_resist = magic_resist;
    }
    getDefense() {
        return {
            armor: 0,
            magic_resist: this.#magic_resist
        };
    }
}

//Not doing proper multiple inheritance for the lack of time
// class MagicalArmor extends Armor, Amulet {
//     constructor(name) {
//         super(name);
//     }
// }

class MagicalArmor extends Armor {
    #armor;
    #magic_resist;
    constructor(name, armor, magic_resist) {
        super(name, armor, magic_resist);
        this.#armor = armor;
        this.#magic_resist = magic_resist;
    }
    getDefense() {
        return {
            armor: this.#armor,
            magic_resist: this.#magic_resist
        };
    }
}

const armorNames = [
    "Steel Breastplate", "Iron Helm", "Dragon Scale Shield", "Knight's Gauntlets", "Brigandine Armor",
    "Leather Jerkin", "Chainmail Hauberk", "Ornate Pauldrons", "Bronze Greaves", "Silver Chestplate",
    "Viking Helmet", "Fire-resistant Cloak", "Templar Shield", "Thief's Leather Armor", "Ranger's Vest",
    "Cavalry Helm", "Mythril Chainmail", "Paladin's Plate", "Dwarven Chestguard", "Elven Light Armor",
    "Huntsman's Cuirass", "Barbarian Chestpiece", "Gladiator's Harness", "Gilded Armor", "Mercenary Armor",
    "Holy Knight Breastplate", "Shaman's Hide Armor", "Demonhunter Armor", "Stormguard Plate", "Frostguard Armor"
];

const amuletNames = [
    "Amulet of Fire Resistance", "Necklace of the Storm", "Talisman of the Moon", "Charm of the Arcane",
    "Pendant of Shadows", "Locket of Protection", "Amulet of the Serpent", "Necklace of Vitality", "Orb of Tranquility",
    "Talisman of Wisdom", "Rune of Regeneration", "Amulet of True Sight", "Pendant of Resilience", "Charm of Silence",
    "Amulet of the Phoenix", "Talisman of the Earth", "Amulet of the Frozen Wastes", "Charm of Lightning",
    "Pendant of the Sea", "Talisman of Energy", "Rune of Fortune", "Necklace of the Sun", "Charm of Clarity",
    "Amulet of the Storm King", "Necklace of Binding", "Charm of Foresight", "Pendant of Valor", "Rune of the Ancients",
    "Amulet of the Eclipse", "Locket of the Wind"
];

const magicalArmorNames = [
    "Dragonbone Armor", "Runic Plate", "Spectral Armor", "Sorcerer's Shield", "Eldritch Plate"
];


// Function to randomly select items from an array
function getRandomItem(arr, used) 
{
    if (used.length >= arr.length) {
        used = [];
    }
    let seed = Math.floor(Math.random() * arr.length);
    let name = arr[seed];
    if (used) {
        while (used.includes(name)) {
            seed ++;
            if (seed >= arr.length) {
                seed = 0;
            }
            name = arr[seed];
        }
    }
    return name;
}

// Generating 50 equipment items with 45% armor, 45% amulet, and 10% magical armor


const MagicArmorProbability = 0.1;

const genEquipament = (size) => {
    let equipaments = [];
    let used_armor = [];
    let used_amulet = [];
    let used_magical_armor = [];

    for (let i = 0; i < size; i++) {
        const rand = Math.random();
        const armor = Math.floor(Math.random() * 100);
        const magic_resist = Math.floor(Math.random() * 100);
        
        if (rand < MagicArmorProbability) {
            const name = getRandomItem(magicalArmorNames, used_magical_armor);
            used_magical_armor.push(name);
            equipaments.push(new MagicalArmor(name, armor, magic_resist));
        } else if (rand < MagicArmorProbability + (1 - MagicArmorProbability) / 2) {
            const name = getRandomItem(amuletNames, used_amulet);
            used_amulet.push(name);
            equipaments.push(new Amulet(name, magic_resist));
        } else {
            const name = getRandomItem(armorNames, used_armor);
            used_armor.push(name);
            equipaments.push(new Armor(name, armor));
        }

        //console.log(equipaments[i].name);
    }
    return equipaments;
}


const getMaxEquipamentNameLength = () => {
    let max = 0;
    for (const name of armorNames) {
        if (name.length > max) {
            max = name.length;
        }
    }
    for (const name of amuletNames) {
        if (name.length > max) {
            max = name.length;
        }
    }
    for (const name of magicalArmorNames) {
        if (name.length > max) {
            max = name.length;
        }
    }
    return max;
}



module.exports = { Armor, Amulet, MagicalArmor,Equipament, getMaxEquipamentNameLength, genEquipament };