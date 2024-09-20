const {SelectValue} = require("./Base/ConsoleHelp.js");

class Menu
{
    static async selectClass()
    {
        const classes = ['Warrior', 'Mage', 'Rogue'];
        return await SelectValue('Select your class:', classes);
    }
}