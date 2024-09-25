const ConsoleImpl = require('./Base/ConsoleHelp.js')
const CH = new ConsoleImpl.ConsoleImplementation_x86();
const Colors = ConsoleImpl.DefaultColors
const Decorations = ConsoleImpl.Decorations

const Assets = require("./Assets/Assets.js");
const { Genie } = require("./Genie.js");

/*
    Menu Singleton for handling game menus
*/

class Menu {
    static gameMenuOptions = ["Continue", "New Game", "Info", "Help", "Exit"];
    static startMenuOptions = ["New  Game", "Load Game", "Info", "Exit"];
    static gameEndOptions = ["Play Again", "Exit"];
    static #devMode = false;
    static gameInstance = undefined;
    static startMenu(startIndex = 0) {
        CH.clear_screen();
        CH.print(Assets.Logos.paintedConsoleAdventure());
        const options = Menu.startMenuOptions;
        return CH.SelectValue(
            options, {
            devMode: Menu.#devMode,
            start: startIndex,
            gameInstance: Menu.gameInstance,
            colors: [{
                text: options[options.length - 1],
                color: Colors.RED
            },
            {
                text: "Load Game",
                color: Colors.LIGHTBLACK_EX
            }]
        }, true, true
        );
    }
    static gameMenu(startIndex = 0) {
        CH.clear_screen();
        CH.print(Assets.Logos.paintedConsoleAdventure());
        const options = Menu.gameMenuOptions;
        return CH.SelectValue(
            options, {
            devMode: Menu.#devMode,
            start: Math.max(startIndex, 0),
            gameInstance: Menu.gameInstance,
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
            devMode: Menu.#devMode,
            gameInstance: Menu.gameInstance,
            colors: [{
                text: "Exit",
                color: Colors.RED
            }]
            ,

        }, true);
    }
    static infoMenu(genie) {
        CH.clear_screen();
        CH.print(Assets.Logos.paintedMattediWorks());

        const devInfo =
            `
        Designed and Developed by: Vitor Mattedi - MattediWorks
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
        if (genie instanceof Genie) {
            genie.speak(info.join("\n"), [
                {
                    text: "Console",
                    color: Colors.YELLOW
                },
                {
                    text: "Adventure",
                    color: Colors.GREEN
                }
            ]);
        }
        CH.print(devInfo.split("\n").map((line) => CH.hcenter(line, CH.getWidth())).join("\n"));
        CH.pressSpace("to go back");
    }
    static setDevMode(value) {
        if (typeof value !== "boolean") {
            Menu.#devMode !=  Menu.#devMode;
        }
        Menu.#devMode = value;
    }
}

module.exports = { Menu };    