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
    static gameMenuOptions = ["Continue", "Main Menu", "Save Game", "Info", "Help", "Exit"];
    static startMenuOptions = ["New Game", "Load Game!", "Info", "Exit"];
    static gameEndOptions = ["Play Again", "Exit"];
    static battleMenuOptions = ['Attack', 'Flee', 'Equipament', 'Menu', 'Dev Button'];
    static startMenu(startIndex = 0, returnindex = true) {
        CH.clear_screen();
        CH.print(Assets.Logos.paintedConsoleAdventure());
        const options = Menu.startMenuOptions;
        return CH.SelectValue(
            options, {
            start: startIndex,
            colors: [{
                text: options[options.length - 1],
                color: Colors.RED
            },
            {
                text: "Load Game!",
                color: Colors.LIGHTBLACK_EX
            }]
        }, returnindex, true
        );
    }
    static gameMenu(startIndex = 0) {
        CH.clear_screen();
        CH.print(Assets.Logos.paintedConsoleAdventure());
        const options = Menu.gameMenuOptions;
        return CH.SelectValue(
            options, {
            start: Math.max(startIndex, 0),
            colors: [{
                text: options[options.length - 1],
                color: Colors.RED
            }]
        }, true, true
        );
    }
    static gameEnd() {
        const options = Menu.gameEndOptions;
        return CH.SelectValue(options, {
            colors: [{
                text: "Exit",
                color: Colors.RED
            }]
            ,

        }, true);
    }
    static infoMenu() {
        CH.clear_screen();
        CH.print(Assets.Logos.paintedMattediWorks());

        const devInfo =
            `
        Designed and Developed by: ${CH.insert_format({
                decoration: [Decorations.Bold, Decorations.Italic]
            }, "Vitor Mattedi")} - MattediWorks
        `;
        const info = [
            "Welcome to Console Adventure!",
            "This is a text-based adventure game",
            "where you can explore a world",
            "filled with magic and mystery.",
            "You can interact with characters,",
            "solve puzzles, and fight monsters.",
            "Good luck and have fun!",
        ];

        Genie.getInstance().speak(info.join("\n"), [
            {
                text: "Console",
                color: Colors.YELLOW
            },
            {
                text: "Adventure",
                color: Colors.GREEN
            }
        ]);


        CH.print(devInfo.split("\n").map((line) => CH.hcenter(line, CH.getWidth())).join("\n"));
        CH.pressSpace("to go back");
    }
    static battleMenu() {
        const options = DevMode.getInstance().value ? Menu.battleMenuOptions : Menu.battleMenuOptions.slice(0, -1);
        return CH.SelectValue(
            options, {
            start: 0,
            padding: DevMode.getInstance().value ? 5 : 10,
            colors: [{
                text: "Menu",
                color: Colors.LIGHTYELLOW_EX
            },
            {
                text: "Dev Button",
                color: Colors.BG_YELLOW
            }]
        }, true, false
        );
    }
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