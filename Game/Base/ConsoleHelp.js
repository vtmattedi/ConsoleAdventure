
//ANSI escape codes: https://en.wikipedia.org/wiki/ANSI_escape_code
// Terminal Handling implementations

const { DevMode } = require('./DevMode.js');

// ANSI control sequences => color = CSI n m
class ControlSequences {
    static get CSI() { return '\x1b['; }
    static get OSC() { return '\x1b]'; }
    static get BEL() { return '\a'; }
    static get Reset() { return '\x1b[0m'; }
}

//n number for colors and 8/24bit color constructor
class DefaultColors {
    static get BLACK() { return 30; }
    static get RED() { return 31; }
    static get GREEN() { return 32; }
    static get YELLOW() { return 33; }
    static get BLUE() { return 34; }
    static get MAGENTA() { return 35; }
    static get CYAN() { return 36; }
    static get WHITE() { return 37; }
    static get LIGHTBLACK_EX() { return 90; }
    static get LIGHTRED_EX() { return 91; }
    static get LIGHTGREEN_EX() { return 92; }
    static get LIGHTYELLOW_EX() { return 93; }
    static get LIGHTBLUE_EX() { return 94; }
    static get LIGHTMAGENTA_EX() { return 95; }
    static get LIGHTCYAN_EX() { return 96; }
    static get LIGHTWHITE_EX() { return 97; }
    static get BG_BLACK() { return 40; }
    static get BG_RED() { return 41; }
    static get BG_GREEN() { return 42; }
    static get BG_YELLOW() { return 43; }
    static get BG_BLUE() { return 44; }
    static get BG_MAGENTA() { return 45; }
    static get BG_CYAN() { return 46; }
    static get BG_WHITE() { return 47; }
    static get BG_RESET() { return 49; }


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
    fillBar = (percent, size, char) => {
        throw new ConsoleNotImplemented();
    }
    insert_color = (color, text) => {
        throw new ConsoleNotImplemented();
    }

    insert_format = (format, text) => {
        throw new ConsoleNotImplemented();
    }

    clear_screen = () => {
        throw new ConsoleNotImplemented();
    }

    clear_line = () => {
        throw new ConsoleNotImplemented();
    }

    clear_last_line = (times) => {
        throw new ConsoleNotImplemented();
    }

    getWidth = () => {
        throw new ConsoleNotImplemented();
    }

    show_cursor = (value = true) => {
        throw new ConsoleNotImplemented();
    }

    print = (text) => {
        throw new ConsoleNotImplemented();
    }

    setTitle = (title) => {
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
        return ControlSequences.CSI + color + `m` + text + ControlSequences.Reset
    }

    insert_format = (format = {
        color: DefaultColors.WHITE,
        background: DefaultColors.BLACK,
        decoration: Decorations.None
    }, text) => {
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

   
    printOptions = (options, selectIndex = 0 , config, vertical = false) => {
        let res = "";
        const padChar = DevMode.getInstance().value ? '#' : ' ';
        let padding = padChar.repeat(3);
        if (config && config.padding) {
            padding = padChar.repeat(config.padding);
        }
        const width = this.getWidth();
        const maxLength = Math.max(...options.map(item => item.length));
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
        if (res.length > width && !vertical) {
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
    hcenter = (input, size, char = " ", mode = 0, treatAsRaw = false) => {
       
        //Added support for multiline text
        const centerLine = (text)=>
        {
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
        // const isMultiLine = input.includes('\n');

        // if (isMultiLine && !treatAsRaw) {
        //     let lines = input.split('\n');
        //     lines = lines.map(line => centerLine(line));
        //     return lines.join('\n');
        // }
        // else 
            return centerLine(input);
    }

    // Vertical center a sprite, mode => 0 = center, 1 = top, 2 = bottom
    // input should be an array of strings
    vcenter = (input, verticalLength, horizontalLength, char = " ", mode = 0) => {
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
module.exports = {
    BasicConsole,
    DefaultColors,
    Decorations
}
