/// Contains the default colors for the game classes, weapons, equipment, hp, and stats
const {DamageType } = require('./DamageTypes.js')
const Equip = require('./Equipament.js');
const { DefaultColors } = require('./ConsoleHelp.js');

class GameColors
{
    static get class_colors() {
        return [
            {
                text: 'Warrior',
                color: DefaultColors.custom_colors(94)
            },
            {
                text: 'Mage',
                color: DefaultColors.custom_colors(117)
            },
            {
                text: 'Rogue',
                color: DefaultColors.YELLOW
            }
        ]
    }

    static get weapon_colors() {
        return [
            {
                text: DamageType.Physical,
                color: DefaultColors.RED
            },
            {
                text: DamageType.Magic,
                color: DefaultColors.BLUE
            },
            {
                text: DamageType.Hybrid,
                color: DefaultColors.YELLOW
            }
        ]
    }

    static get equip_colors() {
        return [
            {
                text: 'Armor',
                color: DefaultColors.GREEN
            },
            {
                text: 'Amulet',
                color: DefaultColors.CYAN
            },
            {
                text: 'MagicArmor',
                color: DefaultColors.MAGENTA
            }
        ]
    }
    static getEquipamentColor(equipament) {
        if (!(equipament instanceof Equip.Equipament)) {
           throw new Error("Equipament must be an instance of Equipament");
        }
        
        if (equipament instanceof Equip.Armor) {
            return GameColors.equip_colors[0].color;
        }
        else if (equipament instanceof Equip.Amulet) {
            return GameColors.equip_colors[1].color;
        }
        else if (equipament instanceof Equip.MagicalArmor) {
            return GameColors.equip_colors[2].color;
        }
    }
    static get hp_colors() {
        return [
            {
                text: 'Low',
                color: DefaultColors.RED
            },
            {
                text: 'Medium',
                color: DefaultColors.custom_colors(178)
            },
            {
                text: 'High',
                color: DefaultColors.GREEN
            }
        ]
    }

    static get stats_colors() {
        return [
            {
                text: 'Strength',
                color: DefaultColors.RED
            },
            {
                text: 'Intelligence',
                color: DefaultColors.BLUE
            },
            {
                text: 'Dexterity',
                color: DefaultColors.YELLOW
            },
            {
                text: 'Armor',
                color: DefaultColors.GREEN
            },
            {
                text: 'Magic Resist',
                color: DefaultColors.CYAN
            }
        ]
    }
}

module.exports = { GameColors };