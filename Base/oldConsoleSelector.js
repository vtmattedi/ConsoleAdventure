const readline = require("readline-sync");
const { Colors, insert_color } = require("./ConsoleHelp.js");


function SelectValue(options, colors, returnIndex) {
    let _current = 0;
    if (!Array.isArray(options)) return "";
    printOptions = () => {
        res = "";
        const padding = " ".repeat(4);
        for (let i = 0; i < options.length; i++) {
            curr = `${options[_current]}`;
            if (i === _current) res += `> ${options[i]} <`;
            else res += `${options[i]}`;
            res += padding;
        }
        //insert color
        if (Array.isArray(colors)) {
            colors.forEach(item => {
                res = res.replace(item.text, insert_color(item.color, item.text));
            });
        }
        console.log(res);
    };

    cl = () => {
        process.stdout.write("\x1b[1A"); // Move cursor up one line
        process.stdout.write("\x1b[2K"); // Clear the line
    };
    printOptions();
    //hide cursor
    //process.stdout.write("\x1b[?25l");
    while (true) {
        let key = readline.keyIn(" ", { hideEchoBack: true });
        cl();
        //get arow keys (Linux only)
        if (key === "[") {
            const cmd = readline.keyIn(" ");
            if (cmd === "D") key = "left";
            else if (cmd === "C") key = "right";
            cl();
        }
        if (key === "a" || key === "left") {
            _current = Math.max(0, _current - 1);
        } else if (key === "d" || key === "right") {
            _current = Math.min(options.length - 1, _current + 1);
        } else if (key === " ") {
            cl();
            cl();
            if (returnIndex) return _current;
            //show cursor

            return options[_current];

        }
        cl();
        printOptions();
    }
}

function center(input, size, char = " ") {
    if (typeof input !== "string") return undefined;
    let start = true;

    while (input.length < size) {
        if (start) input = char + input;
        else input += char;
        start = !start;
    }
}

/*  ------------------- Name (Class) lv ------------------------------------
    Equipament:         Health: 100%       Xp: 10/1000       items:



*/


module.exports = { SelectValue };