//ANSI escape codes: https://en.wikipedia.org/wiki/ANSI_escape_code
// Terminal Coloring Helping functions for the final project of js POO

const { clear } = require("console")

// Intlisense complaings but does work
const CSI = '\033['
const OSC = '\033]'
const BEL = '\a'

const reset = CSI + `0m`
const Colors = {
    BLACK: 30,
    RED: 31,
    GREEN: 32,
    YELLOW: 33,
    BLUE: 34,
    MAGENTA: 35,
    CYAN: 36,
    WHITE: 37,
    RESET: 39,

    LIGHTBLACK_EX: 90,
    LIGHTRED_EX: 91,
    LIGHTGREEN_EX: 92,
    LIGHTYELLOW_EX: 93,
    LIGHTBLUE_EX: 94,
    LIGHTMAGENTA_EX: 95,
    LIGHTCYAN_EX: 96,
    LIGHTWHITE_EX: 97
}

insert_color = (color, text) => {
    return CSI + color + `m` + text + reset
}

clear_screen = () => {
    return CSI + `2J`
}

clear_line = () => {
    return CSI + `2K`
}

clear_last_line = () => {
   // process.stdout.write('\x1b[1A'); // Move cursor up one line
    process.stdout.write('\x1b[2K'); // Clear the entire line
}

module.exports = {insert_color, Colors, clear_screen, clear_line, clear_last_line}