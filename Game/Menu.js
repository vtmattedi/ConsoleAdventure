const ConsoleImpl = require('./Base/ConsoleHelp.js')
const CH = new ConsoleImpl.ConsoleImplementation_x86();
const Colors = ConsoleImpl.DefaultColors
const Decorations = ConsoleImpl.Decorations
const { DevMode } = require('./Base/DevMode.js');
const Assets = require("./Assets/Assets.js");
const { Genie } = require("./Genie.js");

/*
   static Menu class for handling game menus
*/

class Menu {
    static gameMenuOptions = ["Continue", "Main Menu...", "Save Game...", "Info", "Help", "Exit"];
    static startMenuOptions = ["New Game", "Load Game!", "Info", "Exit"];
    static gameEndOptions = ["Play Again", "Exit"];
    static battleMenuOptions = ['Attack', 'Flee', 'Equipament', 'Menu'];
    static gameModeOptions = ['Story Mode', 'Gauntlet', 'Back'];

}
// static gameMenuOptions = ["Continue", "New Game", "Info", "Help", "Exit"];
// static startMenuOptions = ["New Game", "Load Game!", "Info", "Exit"];
// static gameEndOptions = ["Play Again", "Exit"];

// Enumerations for menu options
class GameMenuOptions {
    static get Continue() { return 0; }
    static get MainMenu() { return 1; }
    static get SaveGame() { return 2; }
    static get Info() { return 3; }
    static get Help() { return 4; }
    static get Exit() { return 5; }
}

class StartMenuOptions {
    static get NewGame() { return 0; }
    static get LoadGame() { return 1; }
    static get Info() { return 2; }
    static get Exit() { return 3; }
}

class GameEndOptions {
    static get PlayAgain() { return 0; }
    static get Exit() { return 1; }
}

class BattleMenuOptions {
    static get Attack() { return 0; }
    static get Flee() { return 1; }
    static get Items() { return 2; }
    static get Menu() { return 3; }
    static get DevButton() { return 4; }
}

module.exports = { Menu, GameMenuOptions, StartMenuOptions, GameEndOptions, BattleMenuOptions };    