import { Game, GameStates, MainMenuStage } from './Game/Game.js';
import { Genie } from './Game/Genie.js';
import Assets from './Game/Assets/Assets.js';
import * as ConsoleImpl from  './Game/Base/ConsoleHelp.js';
const CH = new ConsoleImpl.BasicConsole();
const Colors = ConsoleImpl.DefaultColors;
import { DevMode } from './Game/Base/DevMode.js';
import process from 'process';
CH.setTitle('Console Adventure Game');
import readline from 'readline';


const game = new Game();
process.stdin.setRawMode(true);
readline.emitKeypressEvents(process.stdin);


Assets.Logos.animate(
    Assets.Logos.ConsoleAdventure,
    10,
    {
        color: Colors.GREEN,
        index: Assets.Logos.ca_cutoff,
        bgcolor: Colors.YELLOW
    },
    true,
    () => {
        setTimeout(() => {
            GameStates.getInstance().currentState = game.mainMenu;
            Game.mainMenuState = MainMenuStage.PreMenu;
            CH.clear_screen();
            GameStates.rerender();
        }, 500);
    });
GameStates.render();
game.exitTheGame = () => {
    CH.write("\x1b[3J");
    CH.clear_screen();
    Genie.getInstance().goodbye(game.player.name);
    process.exit();
}
process.stdout.on('resize', () => {
    //console.clear();

    //Scroll down
    CH.write("\x1b[3J");
    GameStates.rerender();
    //console.log(CH.getWidth());
    //console.log(CH.getHeight

});
let delCount = 0;

process.stdin.on('keypress', (key, data) => {

    //console.log(key, data);
    if (delCount > 0) {
        CH.clear_last_line(delCount);
        delCount = 0;
    }
    let input = "";

    if (typeof data.name === "undefined") {
        input = data.sequence;
    }
    else if (data.name === "up") input = "arrowup";
    else if (data.name === "down") input = "arrowdown";
    else if (data.name === "left") input = "arrowleft";
    else if (data.name === "right") input = "arrowright";
    else if (data.name === "space") input = "space";
    else if (data.name === "return") input = "enter";
    else if (data.name === "escape") input = "esc";
    else if (data.name === "backspace") input = "backspace";
    else input = data.name;

    if (data.ctrl && data.name === 'd') {
        CH.print("Width: " + CH.getWidth());
        delCount = 1;
    }
    else if (data.ctrl && data.name === 'b') {
        DevMode.getInstance().setValue();
        GameStates.rerender();
        CH.print("Dev Mode: " + DevMode.getInstance().value);
        delCount = 1;
    }

    else {
        game.handleInput(input);
        GameStates.render();
    }


    if (data && data.ctrl && data.name === 'c') {
        console.clear();
        new Genie().goodbye(game.player.name);
        process.exit();

    }
});


