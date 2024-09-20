const setTitle = require('console-title');
const { Game } = require('./Base/Game.js');
const {Genie, genie_img} = require('./Genie.js');
const { insert_color, Colors} = require('./Base/ConsoleHelp.js');
const rl = require('readline-sync');


setTitle('Console Adventure Game');

const currentGame = new Game('Adventure');
// console.log(selectOption(["Save","Load","Continue", "Exit"]));



const multiLineText = `Hello Adventurer!
Welcome to the game.
(Press enter to continue)`;

// console.log(createBubble(genie_img));

Genie.speak(multiLineText, {
    textColors: [{
        text:'enter',
        color: Colors.YELLOW
    }]
});
const options = ['Left', 'Right'];
function displayOptions() {
    process.stdout.write('\x1b[1A'); // Move cursor up one line
    process.stdout.write('\x1b[2K'); // Clear the line
    console.log(`Use arrows: [ ${options[0]} ]   [ ${options[1]} ]`);
}
process.stdin.setRawMode(true);
function selectOption() {
    while (true) {
        const key = rl.keyIn(' ');
        console.log(`>`,key);
        if (key === 'l') {
            selected = 0;
        } else if (key === 'r') {
            selected = 1;
        } else if (key === ' ') {
            process.stdout.write('\x1b[1A'); // Move cursor up
            process.stdout.write('\x1b[2K'); // Clear line
            console.log(`You selected: ${options[selected]}`);
            return options[selected];
        }
    }
}

selectOption();
process.exit();
while (currentGame.isRunning) {
    Genie.speak("Enter your move (N/S/E/W): ");
    const move = rl.question('Enter your move (N/S/E/W): ');
    if (move[0] === "/")
    {
        currentGame.handleCommands(move.slice(1));
        continue;
    }
    if (move === 'exit') {
        currentGame.End();
    } else {
        currentGame.playerMove(move);
    }
}


