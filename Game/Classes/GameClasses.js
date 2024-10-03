import { Mage } from './Mage.js';
import { Warrior } from './Warrior.js';
import { Rogue } from './Rogue.js';

class PlayerFactory {
    createPlayer(name, classType) {
        switch (classType) {
            case "Warrior":
                return new Warrior(name);
            case "Mage":
                return new Mage(name);
            case "Rogue":
                return new Rogue(name);
            default:
                return null;
        }
    }
}

export{
    PlayerFactory
};

