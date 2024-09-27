const {Mage} = require('./Mage');
const {Warrior} = require('./Warrior');
const {Rogue} = require('./Rogue');
const {Player} = require('./Player');

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

module.exports = {
    PlayerFactory
};

