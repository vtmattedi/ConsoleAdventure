
//ANSI escape codes: https://en.wikipedia.org/wiki/ANSI_escape_code
// Terminal Handling implementations

import { DevMode } from './DevMode.js';

// ANSI control sequences => color = CSI n m
class ControlSequences {
    static get CSI() { return '\x1b['; }
    static get OSC() { return '\x1b]'; }
    static get Reset() { return '\x1b[0m'; }
}

//n number for colors and 8/24bit color constructor
class DefaultColors {
    static #BLACK = 30;
    static #RED = 31;
    static #GREEN = 32;
    static #YELLOW = 33;
    static #BLUE = 34;
    static #MAGENTA = 35;
    static #CYAN = 36;
    static #WHITE = 37;
    static #LIGHTBLACK_EX = 90;
    static #LIGHTRED_EX = 91;
    static #LIGHTGREEN_EX = 92;
    static #LIGHTYELLOW_EX = 93;
    static #LIGHTBLUE_EX = 94;
    static #LIGHTMAGENTA_EX = 95;
    static #LIGHTCYAN_EX = 96;
    static #LIGHTWHITE_EX = 97;
    static #BG_BLACK = 40;
    static #BG_RED = 41;
    static #BG_GREEN = 42;
    static #BG_YELLOW = 43;
    static #BG_BLUE = 44;
    static #BG_MAGENTA = 45;
    static #BG_CYAN = 46;
    static #BG_WHITE = 47;
    static #BG_RESET = 49;

    static get BLACK() { return this.#BLACK; }
    static set BLACK(value) { this.#BLACK = value; }
    static get RED() { return this.#RED; }
    static set RED(value) { this.#RED = value; }
    static get GREEN() { return this.#GREEN; }
    static set GREEN(value) { this.#GREEN = value; }
    static get YELLOW() { return this.#YELLOW; }
    static set YELLOW(value) { this.#YELLOW = value; }
    static get BLUE() { return this.#BLUE; }
    static set BLUE(value) { this.#BLUE = value; }
    static get MAGENTA() { return this.#MAGENTA; }
    static set MAGENTA(value) { this.#MAGENTA = value; }
    static get CYAN() { return this.#CYAN; }
    static set CYAN(value) { this.#CYAN = value; }
    static get WHITE() { return this.#WHITE; }
    static set WHITE(value) { this.#WHITE = value; }
    static get LIGHTBLACK_EX() { return this.#LIGHTBLACK_EX; }
    static set LIGHTBLACK_EX(value) { this.#LIGHTBLACK_EX = value; }
    static get LIGHTRED_EX() { return this.#LIGHTRED_EX; }
    static set LIGHTRED_EX(value) { this.#LIGHTRED_EX = value; }
    static get LIGHTGREEN_EX() { return this.#LIGHTGREEN_EX; }
    static set LIGHTGREEN_EX(value) { this.#LIGHTGREEN_EX = value; }
    static get LIGHTYELLOW_EX() { return this.#LIGHTYELLOW_EX; }
    static set LIGHTYELLOW_EX(value) { this.#LIGHTYELLOW_EX = value; }
    static get LIGHTBLUE_EX() { return this.#LIGHTBLUE_EX; }
    static set LIGHTBLUE_EX(value) { this.#LIGHTBLUE_EX = value; }
    static get LIGHTMAGENTA_EX() { return this.#LIGHTMAGENTA_EX; }
    static set LIGHTMAGENTA_EX(value) { this.#LIGHTMAGENTA_EX = value; }
    static get LIGHTCYAN_EX() { return this.#LIGHTCYAN_EX; }
    static set LIGHTCYAN_EX(value) { this.#LIGHTCYAN_EX = value; }
    static get LIGHTWHITE_EX() { return this.#LIGHTWHITE_EX; }
    static set LIGHTWHITE_EX(value) { this.#LIGHTWHITE_EX = value; }
    static get BG_BLACK() { return this.#BG_BLACK; }
    static set BG_BLACK(value) { this.#BG_BLACK = value; }
    static get BG_RED() { return this.#BG_RED; }
    static set BG_RED(value) { this.#BG_RED = value; }
    static get BG_GREEN() { return this.#BG_GREEN; }
    static set BG_GREEN(value) { this.#BG_GREEN = value; }
    static get BG_YELLOW() { return this.#BG_YELLOW; }
    static set BG_YELLOW(value) { this.#BG_YELLOW = value; }
    static get BG_BLUE() { return this.#BG_BLUE; }
    static set BG_BLUE(value) { this.#BG_BLUE = value; }
    static get BG_MAGENTA() { return this.#BG_MAGENTA; }
    static set BG_MAGENTA(value) { this.#BG_MAGENTA = value; }
    static get BG_CYAN() { return this.#BG_CYAN; }
    static set BG_CYAN(value) { this.#BG_CYAN = value; }
    static get BG_WHITE() { return this.#BG_WHITE; }
    static set BG_WHITE(value) { this.#BG_WHITE = value; }
    static get BG_RESET() { return this.#BG_RESET; }
    static set BG_RESET(value) { this.#BG_RESET = value; }


    /// Custom colors 8 bit
    /// 0-7: standard colors (as in DefaultColors.Color)
    /// if num is an array of exactly 3 numbers, it will be a 24bit RGB color
    static custom_colors(num, background = false) {
        let text = '38';
        if (background) {
            text = '48';
        }
        if (Array.isArray(num)) {
            if (num.length === 3) {
                text += `;2;${num[0]};${num[1]};${num[2]}`;
            }
            else {
                return text + `;5;${num[0]}`;
            }
            return text;
        }
        else {
            return text + `;5;${num}`;
        }
    }
}

//ANSI text decoration n
class Decorations {
    static get Bold() { return 1; }
    static get Dim() { return 2; }
    static get Italic() { return 3; }
    static get Underlined() { return 4; }
    static get Blink() { return 5; }
    static get Reverse() { return 7; }
    static get Strikethrough() { return 9; }
    static get no_underline() { return 24; }
}

//Custom console error
class ConsoleNotImplemented extends Error {
    constructor() {
        super("The ConsoleHelper was not properly implemented.");
        this.name = "ConsoleError";
    }
}

//Abstract class
//Each system may have a different implementation
class ConsoleImplementation {
    //
    // Strictly Abstract 
    //
    // Should only throw error if a not implement NESCESSARY feature is tryng to be used
    fillBar = () => {
        throw new ConsoleNotImplemented();
    }
    insert_color = () => {
        throw new ConsoleNotImplemented();
    }

    insert_format = () => {
        throw new ConsoleNotImplemented();
    }

    clear_screen = () => {
        throw new ConsoleNotImplemented();
    }

    clear_line = () => {
        throw new ConsoleNotImplemented();
    }

    clear_last_line = () => {
        throw new ConsoleNotImplemented();
    }

    getWidth = () => {
        throw new ConsoleNotImplemented();
    }

    show_cursor = () => {
        throw new ConsoleNotImplemented();
    }

    print = () => {
        throw new ConsoleNotImplemented();
    }

    setTitle = () => {
        throw new ConsoleNotImplemented();
    }
}


//Singleton for most VTI terminals and OS usage
class BasicConsole extends ConsoleImplementation {
    static #instance = null; //Singleton instance
    constructor() {
        if (BasicConsole.#instance) {
            return BasicConsole.#instance;
        }
        else {
            super();
            BasicConsole.#instance = this;
        }

    }
    /// Already done by the constructor
    /// but here for completeness sake.
    getInstance() {
        return BasicConsole.#instance;
    }
    breakLine = (text, width, ignorenl = false) => {
        if (ignorenl) {
            text = text.replaceAll('\n', ' ');
        }
        let words = text.split(' ');
        let lines = [];
        let line = '';

        words.forEach(word => {
            const lineLength = this.getLineWidth(line);
            const wordLength = this.getLineWidth(word);
            if (lineLength + wordLength > width) {
                lines.push(line);
                line = '';
            }
            line += word + ' ';
        });
        lines.push(line);
        return lines.join('\n');
    }
    clear_screen = () => {
        // this.write(ControlSequences.CSI + `2J`)
        console.clear();
    }
    write = (text) => {
        process.stdout.write(text);
    }
    clear_line = () => {
        this.write(ControlSequences.CSI + `2K`)
    }

    clear_last_line = (times) => {
        for (let i = 0; i < (times || 1); i++) {
            this.write('\x1b[1A'); // Move cursor up one line
            this.clear_line(); // Clear the entire line
        }
    }

    getWidth = () => {
        return process.stdout.columns;
    }

    show_cursor = (value = true) => {
        if (value)
            this.write('\u001B[?25h');
        else
            this.write('\u001B[?25l');
    }

    insert_color = (color, text) => {
        return ControlSequences.CSI + color + `m` + text + ControlSequences.Reset;
    }

    insert_format = (format = {
        color: DefaultColors.WHITE,
        background: DefaultColors.BLACK,
        decoration: Decorations.None
    }, text) => {
        if (!text) return '';
        if (text.includes(ControlSequences.Reset)) {
            const color = format.color || DefaultColors.WHITE;
            text = text.replaceAll(ControlSequences.Reset, ControlSequences.CSI + color + `m`);
        }
        let fmt = '';
        let addSemi = false;
        if (format.color) {

            fmt += format.color;
            addSemi = true;
        }
        if (format.background) {
            if (addSemi)
                fmt += ';';
            fmt += format.background;
            addSemi = true;
        }
        if (format.decoration) {
            let decorationArray = [];
            if (!Array.isArray(format.decoration))
                decorationArray = [format.decoration];
            else
                decorationArray = format.decoration;

            decorationArray.forEach(item => {
                if (addSemi)
                    fmt += ';';
                fmt += item;
                addSemi = true;
            });
        }
        return ControlSequences.CSI + fmt + `m` + text + ControlSequences.Reset
    }

    fillBar = (percent, size, char, color, bg_color) => {
        if (typeof percent !== 'number')
            throw new Error("Percent must be a number")
        if (typeof size !== 'number' || size < 1)
            throw new Error("Size must be a positive integer")
        if (typeof (char) !== 'string' || char.length !== 1)
            throw new Error("Char must be exactly 1 char");

        //claps percent between 0 and 1
        percent = Math.max(percent, 0);
        percent = Math.min(percent, 1);
        const cut_off = Math.round(percent * size)

        let line = this.insert_color(color, char.repeat(cut_off)) + this.insert_color(bg_color, char.repeat(size - cut_off));
        return line;

    }


    printOptions = (options, selectIndex = 0, config, vertical = false) => {
        let res = "";
        const padChar = DevMode.getInstance().value ? '#' : ' ';
        let padding = padChar.repeat(3);
        if (config && config.padding) {
            padding = padChar.repeat(config.padding);
        }
        const width = this.getWidth();
        //const maxLength = Math.max(...options.map(item => item.length));
        const totalLength = options.reduce((acc, item) => acc + item.length, 0) + padding.length * options.length;
        if (totalLength > width) {
            padding = " ".repeat(0);
        }
        for (let i = 0; i < options.length; i++) {
            let line = `  ${options[i]}  `;

            if (i === selectIndex)
                line = `> ${options[i]} <`;

            //line = `${line} :[${line.length}]`;
            // let char = ' ';
            // if (DevMode.getInstance().value) {
            //     char = '#';
            // }
            if (vertical) {
                res += this.hcenter(line, width, padChar);
                res += '\n';
            }
            else {
                res += line;
                res += padding;
            }
        }
        res = this.hcenter(res, width);
        if (this.getLineWidth(res) > width && !vertical) {
            res = res.substring(0, width);
        }

        //insert colors
        res = res.replace(options[selectIndex], this.insert_format({
            decoration: Decorations.Underlined
        }, options[selectIndex]));
        res = res.replaceAll('>', this.insert_color(DefaultColors.YELLOW, '>'));
        res = res.replaceAll('<', this.insert_color(DefaultColors.YELLOW, '<'));
        if (config && Array.isArray(config.colors)) {
            config.colors.forEach(item => {
                res = res.replaceAll(item.text, this.insert_color(item.color, item.text));
            });
        }

        this.print(res);
        return res;
    }

    // Horizontal center a line, mode => 0 = center, 1 = left, 2 = right
    // MultiLine text is supported, each line will be centered
    // if treatAsRaw is true, it will treat the input as a single line
    hcenter = (input, size, char = " ", mode = 0) => {

        //Added support for multiline text
        const centerLine = (text) => {
            if (typeof text !== "string") return undefined;
            let start = mode !== 1;

            while (this.getLineWidth(text) < size) {
                if (start) text = char + text;
                else text += char;
                if (mode === 0)
                    start = !start;
            }
            return text;
        }

        return centerLine(input);
    }

    // Vertical center a sprite, mode => 0 = center, 1 = top, 2 = bottom
    // input should be an array of strings
    vcenter = (input, verticalLength, horizontalLength, char = " ", mode = 0) => {
        const diff = verticalLength - input.length;
        let center = mode === 2;
        for (let i = 0; i < diff; i++) {
            //Keep centered
            if (center)
                input.push(char.repeat(horizontalLength));
            else
                input.unshift(char.repeat(horizontalLength));
            if (mode === 0)
                center = !center;
        }
        return input;
    }

    // Merge two sprites to be printed together
    // If you need Colors, you can pass an array of objects with the text and color
    // but only use at the last merged you do before printing to the console.
    merge = (leftSprite, rightSprite, options = {}) => {
        if (typeof (leftSprite) !== 'string' || typeof (rightSprite) !== 'string') return undefined;
        let rightLines = rightSprite.split('\n');
        let leftLines = leftSprite.split('\n');
        const maxLengthLeft = Math.max(...leftLines.map(line => this.getLineWidth(line)));
        const maxLengthRight = Math.max(...rightLines.map(line => this.getLineWidth(line)));

        // Preprocess Sprites
        // Left Sprite
        if (options.left && options.left.align) {
            if (options.left.align === 'hcenter') {
                leftLines = leftLines.map(line => this.hcenter(line, maxLengthLeft, ' '));
            }
            else if (options.left.align === 'vcenter') {
                this.vcenter(leftLines, rightLines.length, maxLengthLeft, ' ');
            }
        }
        // Right Sprite
        if (options.right && options.right.align) {
            if (options.right.align === 'hcenter') {
                //hcenter each line
                rightLines = rightLines.map(line => this.hcenter(line, maxLengthRight, ' '));
            }
            else if (options.right.align === 'vcenter') {
                //vcenter the right sprite with the left one
                this.vcenter(rightLines, leftLines.length, maxLengthRight, ' ');
            }
        }

        if (leftLines.length < rightLines.length)
            this.vcenter(leftLines, rightLines.length, maxLengthLeft, ' ', 2)

        let mergedLines = leftLines.map((line, index) => {
            const sentenceLine = rightLines[index] || ' '.repeat(maxLengthRight);
            const padding = options.padding || 4;
            return line.padEnd(maxLengthLeft, ' ') + ' '.repeat(padding) + sentenceLine;

        }).join('\n');
        if (Array.isArray(options.colors)) {
            options.colors.forEach(item => {
                if (Array.isArray(item.text)) {
                    item.text.forEach(text => mergedLines = mergedLines.replaceAll(text, this.insert_color(item.color, text)));
                }
                else
                    mergedLines = mergedLines.replaceAll(item.text, this.insert_color(item.color, item.text));
            });
        }
        return mergedLines;
    }


    paintSprite = (sprite, hcutoff, color) => {
        const sprite_array = sprite.split('\n');
        let res = '';

        sprite_array.forEach(element => {
            res += this.insert_color(color, element.substring(0, hcutoff));
            res += element.substring(hcutoff)
            res += '\n';
        });
        return res;
    }

    getLineWidth = (text) => {
        if (!text) return 0;
        let line = text;
        while (line.includes(ControlSequences.CSI)) {
            const csi_index = line.indexOf(ControlSequences.CSI);
            const end_csi = line.indexOf('m', csi_index);
            line = line.substring(0, csi_index) + line.substring(end_csi + 1);

        }
        return line.length;
    }

    pressSpace = (phrase = "to continue") => {
        const width = this.getWidth();
        let final_phrase = `Press Spacebar ${phrase}.`;
        final_phrase = this.hcenter(final_phrase, width);
        final_phrase = final_phrase.replaceAll('Spacebar',
            this.insert_format({
                color: DefaultColors.YELLOW,
                decoration: [Decorations.Underlined, Decorations.Blink]
            }, "Space")
        );
        this.print(final_phrase);
        //this.write(ControlSequences.Reset);
    }

    print = (text) => {
        if (typeof text === 'undefined') {
            this.write('\n');
        }
        else
            this.write(text + '\n');
    }

    setTitle = (title) => {
        this.write('\x1b]2;' + title + '\x1b\x5c');
    }
}
export{
    BasicConsole,
    DefaultColors,
    Decorations
}
