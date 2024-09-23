//ANSI escape codes: https://en.wikipedia.org/wiki/ANSI_escape_code
// Terminal Coloring Helping functions for the final project of js POO
const readline = require("readline-sync");

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

const class_colors =
    [
        {
            text: 'Warrior',
            color: Colors.RED
        },
        {
            text: 'Mage',
            color: Colors.BLUE
        },
        {
            text: 'Rogue',
            color: Colors.YELLOW
        }
    ]

    const weapon_colors =
    [
        {
            text: 'Physical',
            color: Colors.RED
        },
        {
            text: 'Magic',
            color: Colors.BLUE
        },
        {
            text: 'Hybrid',
            color: Colors.YELLOW
        }
    ]
    const equip_colors =
    [
        {
            text: 'Armor',
            color: Colors.GREEN
        },
        {
            text: 'Amulet',
            color: Colors.CYAN
        },
        {
            text: 'MagicArmor',
            color: Colors.MAGENTA
        }
    ]
const get_class_color = (class_name) => {
    const color = class_colors.find(item => item.text === class_name);
}
const insert_color = (color, text) => {
    return CSI + color + `m` + text + reset
}

const clear_screen = () => {
    return CSI + `2J`
}

const clear_line = () => {
    return CSI + `2K`
}

const clear_last_line = (times) => {
    for (let i = 0; i < (times || 1); i++) {
    process.stdout.write('\x1b[2K'); // Clear the entire line
    process.stdout.write('\x1b[1A'); // Move cursor up one line
    }
}

const center = (input, size, char = " ") => {
    if (typeof input !== "string") return undefined;
    let start = true;

    while (input.length < size) {
        if (start) input = char + input;
        else input += char;
        start = !start;
    }
    return input;
}

const hide_cursor = () => {
    process.stdout.write('\u001B[?25l');
}

const SelectValue = (options, config, returnIndex, vertical = false) => {
    let _current = 0;
    if (!Array.isArray(options)) return "";

    if (config && config.start)
        _current = config.start;
    if (config && config.colors && !Array.isArray(config.colors)) {
        config.colors = [config.colors];
    }
    printOptions = () => {
        let res = "";
        const padding = " ".repeat(4);
        const width = process.stdout.columns;
        const maxLength = Math.max(...options.map(item => item.length));
        for (let i = 0; i < options.length; i++) {
            let line = `  ${options[i]}  `;
            
            if (i === _current)
                line = `> ${options[i]} <`;

            //line = `${line} :[${line.length}]`;
            if (vertical) {
                res += center(line, width);
                res += '\n';
            }
            else
                {
                    res += line;
                    res += padding;
                }
        }
        //insert color
        res = center(res, width);
        res = res.replaceAll('>', insert_color(Colors.YELLOW, '>'));
        res = res.replaceAll('<', insert_color(Colors.YELLOW, '<'));

        if (config && Array.isArray(config.colors)) {
            config.colors.forEach(item => {
                res = res.replaceAll(item.text, insert_color(item.color, item.text));
            });
        }
        console.log(res);
    },


        printOptions();
    //hide cursor
    hide_cursor();

    while (true) {
        let key = readline.keyIn(" ", { hideEchoBack: true, mask: '' });
        hide_cursor();
        clear_last_line();
        //get arow keys (Linux only)
        if (key === "[") {
            const cmd = readline.keyIn(" ");
            if (cmd === "D") key = "left";
            else if (cmd === "C") key = "right";
            clear_last_line();
        }
        if (vertical) {
            if (key === "w" || key === "up") {
                _current = Math.max(0, _current - 1);
            } else if (key === "s" || key === "down") {
                _current = Math.min(options.length - 1, _current + 1);
            }
        }
        else {
            if (key === "a" || key === "left") {
                _current = Math.max(0, _current - 1);
            }
            else if (key === "d" || key === "right") {
                _current = Math.min(options.length - 1, _current + 1);
            }
        }
        if (key === " ") {
            clear_last_line();
            if (returnIndex) return _current;
            //show cursor

            return options[_current];

        }
        if (key === "p")
        {
            const width = process.stdout.columns;
            console.log("width:", width);
            pressSpace();
            clear_last_line(2);
        }
        if (vertical) {
            clear_last_line(options.length  + 1); //clear all lines from the options
        }
        else
            clear_last_line();
        printOptions();
    }
}

// Horizontal center a line, mode => 0 = center, 1 = left, 2 = right
const hcenter = (input, size, char = " ", mode = 0) => {
    //if (typeof input !== "string") return undefined;
    let start = mode === 2;

    while (input.length < size) {
        if (start) input = char + input;
        else input += char;
        if (mode === 0)
        start = !start;
    }
    return input;
}

// Vertical center a sprite, mode => 0 = center, 1 = top, 2 = bottom
// input should be an array of strings
const vcenter = (input, verticalLength, horizontalLength, char = " ", mode = 0) => {
    const diff = verticalLength - input.length;
    let center = mode == 2;
    for (let i = 0; i < diff; i++) {
        //Keep centered
        if (center)
            input.push(char.repeat(horizontalLength));
        else
            input.unshift(char.repeat(horizontalLength));
        if (mode == 0)
            center = !center;
    }
    return input;
}

// Merge two sprites to be printed together
// If you need Colors, you can pass an array of objects with the text and color
// but only use at the last merged you do before printing to the console.
const merge = (leftSprite, rightSprite, options = {}) => {
    if (typeof (leftSprite) !== 'string' || typeof (rightSprite) !== 'string') return undefined;
    let rightLines = rightSprite.split('\n');
    let leftLines = leftSprite.split('\n');
    const maxLengthLeft = Math.max(...leftLines.map(line => line.length));
    const maxLengthRight = Math.max(...rightLines.map(line => line.length));

    // Preprocess Sprites
    // Left Sprite
    if (options.left && options.left.align) {
        if (options.left.align === 'hcenter') {
            leftLines = leftLines.map(line => hcenter(line, maxLengthLeft, ' '));
        }
        else if (options.left.align === 'vcenter') {
            vcenter(leftLines, rightLines.length, maxLengthLeft, ' ');
        }
    }
    // Right Sprite
    if (options.right && options.right.align) {
        if (options.right.align === 'hcenter') {
            //hcenter each line
            rightLines = rightLines.map(line => hcenter(line, maxLengthRight, ' '));
        }
        else if (options.right.align === 'vcenter') {
            //vcenter the right sprite with the left one
            vcenter(rightLines, leftLines.length, maxLengthRight, ' ');
        }
    }

    if (leftLines.length < rightLines.length)
        vcenter(leftLines, rightLines.length, maxLengthLeft, ' ', 2)

    let mergedLines = leftLines.map((line, index) => {
        const sentenceLine = rightLines[index] || ' '.repeat(maxLengthRight);
        const padding = options.padding || 4;
        return line.padEnd(maxLengthLeft, ' ') + ' '.repeat(padding) + sentenceLine;

    }).join('\n');
    if (Array.isArray(options.colors)) {
        options.colors.forEach(item => {
            if (Array.isArray(item.text)) {
                item.text.forEach(text => mergedLines = mergedLines.replaceAll(text, insert_color(item.color, text)));
            }
            else
                mergedLines = mergedLines.replaceAll(item.text, insert_color(item.color, item.text));
        });
    }
    return mergedLines;
}

const waitFor = (char = " ", time = -1) => {
    const start = Date.now();
    hide_cursor();
    while (true) {
        if (Date.now() - start > time && time > 0) return false;
        if (readline.keyIn(" ", { hideEchoBack: true, mask: '' }) === char) { clear_last_line(); return true; }
        clear_last_line();
    }
}

const paintSprite = (sprite, hcutoff, color) => {
    const sprite_array = sprite.split('\n');
    let res = '';

    sprite_array.forEach(element => {
        res += insert_color(color, element.substring(0, hcutoff));
        res += element.substring(hcutoff)
        res += '\n';
    });
    return res;
}

const pressSpace = (phrase = "to continue") => {
    const width = process.stdout.columns;

    console.log(hcenter(`Press Spacebar ${phrase}.`, width).replace('Spacebar', insert_color(Colors.YELLOW, 'Spacebar')));
    waitFor(' ');
}

const breakLine = (text, width) => {

    let words = text.split(' ');
    let lines = [];
    let line = '';
    words.forEach(word => {
        if (line.length + word.length > width) {
            lines.push(line);
            line = '';
        }
        line += word + ' ';
    });
    lines.push(line);
    return lines.join('\n');
}

module.exports = {
    Colors,
    class_colors,
    weapon_colors,
    equip_colors,
    insert_color,
    clear_screen,
    clear_line,
    clear_last_line,
    center,
    hide_cursor,
    SelectValue,
    hcenter,
    vcenter,
    merge,
    waitFor,
    paintSprite,
    pressSpace,
    breakLine
}