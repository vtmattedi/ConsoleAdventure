const setTitle = require('console-title');
const { Game } = require('./Base/Game.js');
const { Genie, genie_img } = require('./Genie.js');
const CH = require('./Base/ConsoleHelp.js');
const rl = require('readline-sync');


setTitle('Console Adventure Game');
console.clear();
const currentGame = new Game('Adventure');
const genie = new Genie();
// console.log(selectOption(["Save","Load","Continue", "Exit"]));



const game_intro = `Hello Adventurer!
Welcome to the game.
(Press Spacebar to continue)`;


let selectInfo = `
    You can use a or d 
    to move left or right.
    and select with spacebar.
`;
if (process.platform === 'linux') {
    selectInfo = `
    You can use a or d (or the Arrow Keys) 
    to move left or right.
    and select with spacebar.
    `;
}

if (process.stdout.columns < 87)
{
    let error = 'Warning: Your terminal window is too small to play the game properly. Please resize the window to at least 87 characters wide.';
    error = error.replace("Warning", CH.insert_color(CH.Colors.RED, "Warning"));
    error = error.replace("87", CH.insert_color(CH.Colors.YELLOW, "87"));
    console.log(CH.insert_color(CH.Colors.RED, error));
}
CH.pressSpace("to start")

// console.log(createBubble(genie_img));
const mw =
    `
 __  __         _    _             _  _ __          __           _         
|  \\/  |       | |  | |           | |(_)\\ \\        / /          | |        
| \\  / |  __ _ | |_ | |_  ___   __| | _  \\ \\  /\\  / /___   _ __ | | __ ___ 
| |\\/| | / _\` || __|| __|/ _ \\ / _\` || |  \\ \\/  \\/ // _ \\ | '__|| |/ // __|
| |  | || (_| || |_ | |_|  __/| (_| || |   \\  /\\  /| (_) || |   |   < \\__ \\
|_|  |_| \\__,_| \\__| \\__|\\___| \\__,_||_|    \\/  \\/  \\___/ |_|   |_|\\_\\|___/
                    
                                                                           
`;

const ca =
    `
    ___                      _          _       _                 _                  
   / __\\___  _ __  ___  ___ | | ___    /_\\   __| |_   _____ _ __ | |_ _   _ _ __ ___ 
  / /  / _ \\| '_ \\/ __|/ _ \\| |/ _ \\  //_\\\\ / _\` \\ \\ / / _ | '_ \\| __| | | | '__/ _ \\
 / /__| (_) | | | \\__ | (_) | |  __/ /  _  | (_| |\\ V |  __| | | | |_| |_| | | |  __/
/____/ \\___/|_| |_|___/\\___/|_|\\___| \\_/ \\_/\\__,_| \\_/ \\___|_| |_|\\__|\\__,_|_|  \\___|
                                                                                  
`;
const ca_cutoff = 36;
//hide cursor
process.stdout.write('\u001B[?25l');

anime_sprite = (text, ms, color = { color: CH.Colors.RED, index: 1, bgcolor: CH.Colors.YELLOW }) => {
    const textArray = text.split('\n');
    const hval = Math.max(...textArray.map((item) => item.length));
    const width = process.stdout.columns;
    //console.log(...textArray.map((item) => item.length), hval)
    get_partial = (sprite, index) => {
        let res = '';
        sprite.forEach(element => {
            let line = element.substring(0, index);
            CH.hcenter(line, width);
            if (color) {
                line = CH.insert_color(color.bgcolor, line.substring(0, color.index)) + CH.insert_color(color.color, line.substring(color.index));
            }

            res += CH.hcenter(line, width);
            res += '\n';
        });

        return res;
    }

    for (let i = 0; i < hval; i++) {
        let start = Date.now();
        console.clear();
        console.log(get_partial(textArray, i + 1));
        //get_partial(textArray, i);
        while (Date.now() - start < ms) { }
    }

}
anime_sprite(ca, 15, { color: CH.Colors.GREEN, index: ca_cutoff, bgcolor: CH.Colors.YELLOW });
CH.pressSpace();
console.clear();
genie.introduce();
CH.pressSpace();
console.clear();
genie.explainGame();
CH.pressSpace();

const color_ca = ca.split('\n').map((item) => CH.insert_color(CH.Colors.YELLOW ,item.substring(0, ca_cutoff)) + CH.insert_color(CH.Colors.GREEN, item.substring(ca_cutoff))).join('\n');

mainMenu = () => {
    console.clear();
    console.log(color_ca);
    let select = CH.SelectValue(['New  Game', 'Load Game', 'Exit'], [], true, true);
    return select;
}

let menu_sel  = mainMenu();
while ( menu_sel != 0) {
    menu_sel = mainMenu();
    if (menu_sel == 2) {
        process.exit();
    }
}
console.clear();
genie.speak('Hello again Adventurer!\nI didn\'t catch your name. What is it?');
process.stdout.write('\u001B[?25h'); //show cursor
const playerName = rl.question('My name is: ');
process.stdout.write('\u001B[?25l'); //hide cursor
const nameSeed = Math.random();
let newName = playerName;
if (genie.missBehaviour > nameSeed) {
    newName = genie.generateName();
    genie.speak(`
    I do not like the name: ${playerName}!
    I shall call you ${newName}.`);
}
else {
    genie.speak(`Nice to meet you ${playerName}!`);
}


while (currentGame.isRunning) {
    Genie.speak("Enter your move (N/S/E/W): ");
    const move = rl.question('Enter your move (N/S/E/W): ');
    if (move[0] === "/") {
        currentGame.handleCommands(move.slice(1));
        continue;
    }
    if (move === 'exit') {
        currentGame.End();
    } else {
        currentGame.playerMove(move);
    }
}


