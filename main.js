const { Game } = require('./Game/Game.js');
const { Genie } = require('./Game/Genie.js');
const Assets = require('./Game/Assets/Assets.js');
const ConsoleImpl = require ('./Game/Base/ConsoleHelp.js');
const CH = new ConsoleImpl.ConsoleImplementation_x86();
const Colors = ConsoleImpl.DefaultColors;
const { Menu, StartMenuOptions } = require('./Game/Menu.js');
CH.setTitle('Console Adventure Game');

/*Graphics Display Warning*/
const MIN_WIDTH = 89;
CH.show_cursor(false);
CH.clear_screen();
const current_width = CH.getWidth();
const currentGame = new Game();
const genie = new Genie();
if (current_width  < MIN_WIDTH) {
    let error = `Warning: Your terminal window is too small to play the game properly. Please resize the window to at least 87 characters wide. (current width: ${current_width}) Graphics won't be displayed properly.`;
    error =  CH.breakLine(error, current_width - 2);
    error = error.replace("Warning", CH.insert_color(Colors.RED, "Warning"));
    error = error.replace(`${MIN_WIDTH}`, CH.insert_color(Colors.YELLOW, `${MIN_WIDTH}`));
    error = error.replace(`${current_width}`, CH.insert_color(Colors.YELLOW, `${current_width}`));
    CH.print(CH.insert_color(Colors.RED, error));
    CH.print();
    const choice = CH.SelectValue(["Continue", "Exit"],
        {colors: {
            text: "Exit",
            color: ConsoleImpl.DefaultColors.RED 
        }}
    )
    CH.clear_screen();
    if (choice === 1)
        {
            process.exit()
        }       
        
}
else
CH.pressSpace("to start")

Assets.Logos.animate(
    Assets.Logos.ConsoleAdventure,
    10,
    {
        color: Colors.GREEN,
        index: Assets.Logos.ca_cutoff,
        bgcolor: Colors.YELLOW
    }
);

CH.pressSpace("to start the game");
CH.clear_screen();


genie.explainGame();
let menu_sel = 0;

while (!currentGame.exitGame) {
    menu_sel = Menu.startMenu(menu_sel);
    if (menu_sel === StartMenuOptions.NewGame) {
        currentGame.startGame();
    }
    else if (menu_sel === StartMenuOptions.Info) {
        Menu.infoMenu();
    }
    else if (menu_sel === StartMenuOptions.Exit) {
        currentGame.exitTheGame()
    }

    while (currentGame.isRunning) {
           currentGame.loop();
    }
    
}