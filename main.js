const { Game, GameStates, MainMenuStage } = require('./Game/GameAsync.js');
const { Genie } = require('./Game/Genie.js');
const Assets = require('./Game/Assets/Assets.js');
const ConsoleImpl = require('./Game/Base/ConsoleHelp.js');
const CH = new ConsoleImpl.ConsoleImplementation_x86();
const Colors = ConsoleImpl.DefaultColors;
const { Menu, StartMenuOptions } = require('./Game/Menu.js');
const { DevMode } = require('./Game/Base/DevMode.js');
CH.setTitle(CH.insert_color(ConsoleImpl.DefaultColors.BLUE,'Console Adventure Game'));
const { EquipamentUtils } = require('./Game/Base/Equipament.js');

const readline = require('readline');

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
            Game.MainMenuStage.current_menu = MainMenuStage.PreMenu;
            CH.clear_screen();
            GameStates.getInstance().currentState?.rerender();
        }, 500);
    });
GameStates.getInstance().currentState?.render();
process.stdout.on('resize', () => {
    //console.clear();

    //Scroll down
    CH.write("\x1b[3J");
    GameStates.getInstance().currentState?.rerender();
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
    else if (data.name === "space") {
        input = "space";
    }
    else if (data.name === "return") input = "enter";
    else if (data.name === "escape") input = "esc";
    else if (data.name === "backspace") input = "backspace";
    else input = data.name;

    if (data.ctrl && data.name == 'd') {
        CH.print("Width: " + CH.getWidth());
        delCount = 1;
    }
    else if (data.ctrl && data.name == 'a') {
        DevMode.getInstance().setValue();
        GameStates.getInstance().currentState?.rerender();
        CH.print("Dev Mode: " + DevMode.getInstance().value);
        delCount = 1;
    }
    else if (data.ctrl && data.name == 'b') {
        game.currentEnemy.suicide();
        Game.battleMenu.current_menu = 0;
        GameStates.getInstance().currentState?.rerender();

    }
    else {
        game.handleInput(input);
        GameStates.getInstance().currentState?.render();

    }

    // console.log('Key:', Game.battleMenu.current_menu );
    // delCount ++
    //console.log(input);

    if (data && data.ctrl && data.name == 'c') {
        console.clear();
        new Genie().goodbye(game.player.name);
        process.exit();

    }
});


