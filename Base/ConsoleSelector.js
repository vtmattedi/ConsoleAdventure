const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

const options = ['Left', 'Right'];
let selected = 0;

function displayOptions() {
  process.stdout.write('\x1b[1A'); // Move cursor up one line
  process.stdout.write('\x1b[2K'); // Clear the line
  console.log(`Use arrows: [ ${options[0]} ]   [ ${options[1]} ]`);
}

function selectOption() {
  return new Promise((resolve) => {
    rl.on('keypress', (str, key) => {
      if (key.name === 'left') {
        selected = 0;
      } else if (key.name === 'right') {
        selected = 1;
      } else if (key.name === 'return') {
        process.stdout.write('\x1b[1A'); // Move cursor up
        process.stdout.write('\x1b[2K'); // Clear line
        console.log(`You selected: ${options[selected]}`);
        rl.close();
        resolve(options[selected]);
      }
      displayOptions();
    });
  });
}

// Wait for the user to select an option before proceeding
(async () => {
  displayOptions();
  const userSelection = await selectOption();
  console.log(`Proceeding after selection: ${userSelection}`);
  // Continue with your code here
})();
