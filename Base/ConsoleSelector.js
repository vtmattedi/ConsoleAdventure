const readlineSync = require('readline-sync');

const options = ['Left', 'Right'];
let selected = 0;

function displayOptions() {
    process.stdout.write('\x1b[1A'); // Move cursor up one line
    process.stdout.write('\x1b[2K'); // Clear the line
    console.log(`Use arrows: [ ${options[0]} ]   [ ${options[1]} ]`);
}

function selectOption() {
    while (true) {
        displayOptions();
        const key = readlineSync.keyIn('', { hideEchoBack: true, mask: '', limit: 'lr' });
        if (key === 'l') {
            selected = 0;
        } else if (key === 'r') {
            selected = 1;
        } else if (key === '\r') {
            process.stdout.write('\x1b[1A'); // Move cursor up
            process.stdout.write('\x1b[2K'); // Clear line
            console.log(`You selected: ${options[selected]}`);
            return options[selected];
        }
    }
}


module.exports = { selectOption };