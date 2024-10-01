/// Contains the default colors for the game classes, weapons, equipment, hp, and stats
const {DamageType } = require('./DamageTypes.js')
const { DefaultColors } = require('./ConsoleHelp.js');

class GameColors
{
    static class_colors = [
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
    ];

    static weapon_colors = [
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
    ];

    static equip_colors = [
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
    ];

    static hp_colors = [
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
    ];

    static stats_colors = [
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
    ];

    static ArmorSlot =  DefaultColors.LIGHTBLACK_EX;

}

module.exports = { GameColors };