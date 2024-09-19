var setTitle = require('console-title');
const { Game } = require('./Base/Game.js');
const {Genie, genie_img} = require('./Genie.js');
const {selectOption } = require('./Base/ConsoleSelector.js');
const {COLOR, insert_color, Colors} = require('./Base/ConsoleHelp.js');
const rl = require('readline-sync');
const { text } = require('stream/consumers');


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


