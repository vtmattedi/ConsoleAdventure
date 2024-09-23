const CH = require("./Base/ConsoleHelp.js");
const Assets = require("./Assets/Assets.js");
const { Genie } = require("./Genie.js");
class Menu {
    static gameMenuOptions = ["Continue", "New Game", "Info", "Help", "Exit"];
    static startMenuOptions = ["New Game", "Load Game", "Info", "Exit"];
    static gameEndOptions = ["Play Again", "Exit"];
    static startMenu(startIndex = 0) {
        console.clear();
        console.log(Assets.Logos.paintedConsoleAdventure());
        const options = Menu.startMenuOptions;
        return CH.SelectValue(
            options, {
            start: startIndex,
            colors: [{
                text: options[options.length - 1],
                color: CH.Colors.RED
            },
            {
                text: "Load Game",
                color: CH.Colors.LIGHTBLACK_EX
            }]
        }, true, true
        );
    }
    static gameMenu(startIndex = 0) {
        console.clear();
        console.log(Assets.Logos.paintedConsoleAdventure());
        const options = Menu.gameMenuOptions;
        return CH.SelectValue(
            options, {
            start: Math.max(startIndex, 0),
            colors: [{
                text: options[options.length - 1],
                color: CH.Colors.RED
            }]
        }, true, true
        );
    }
    static gameEnd() {
        const options = Menu.gameEndOptions;
        return CH.SelectValue(options, {
            colors: [{
                text: "Exit",
                color: CH.Colors.RED
            }]
        });
    }

    static infoMenu(genie) {
        console.clear();
        console.log(Assets.Logos.paintedMattediWorks());

        const devInfo =
            `
        Designed and Developed by: Vitor Mattedi - MattediWorks
        `;


        const info = [
            "Welcome to ConsoleAdventure!",
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
                    color: CH.Colors.YELLOW
                },
                {
                    text: "Adventure!",
                    color: CH.Colors.GREEN
                }
            ]);
        }
        console.log(devInfo.split("\n").map((line) => CH.hcenter(line, CH.getWidth())).join("\n"));
        CH.pressSpace("to go back");
    }
}

module.exports = { Menu };    