const ConsoleImpl  = require('./Base/ConsoleHelp.js')
const CH = new ConsoleImpl.ConsoleImplementation_x86();
const Colors = ConsoleImpl.DefaultColors
const Decorations = ConsoleImpl.Decorations
const { class_colors } = require('./Classes/GameClasses.js');
const genie_img =
    `⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣠⣄⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⣿⡿⢿⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠹⠿⠛⣁⣤⣤⣈⠛⠿⠏⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⣀⣤⣴⣶⣤⣈⠙⠻⠟⠋⣁⣤⣶⣦⣤⣀⠀⠀⠀⠀
⠀⣤⣾⣿⣿⣿⣿⣿⣿⣿⣿⣶⣶⣿⣿⣿⣿⣿⣿⣿⣿⣷⣤⠀
⣾⣿⣿⣿⣿⣿⣧⣀⣀⣀⣀⣀⡀⠀⢀⣀⣠⣿⣿⣿⣿⣿⣿⣷
⠙⠿⣿⣿⣿⣿⣿⣿⠿⠿⠋⠁⠀⠶⢿⣿⣿⣿⣿⣿⣿⠿⠿⠋
⠀⠀⠀⠀⠀⣀⣀⣤⣤⣶⣾⣿⣷⣶⣤⣤⣀⣀⣀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠁⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠁⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⠁⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠈⢿⣿⣿⣿⠿⠟⠛⢉⣄⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⢤⣤⣶⣾⣿⣿⣿⣶⣶⣶⠶⠒⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠙⠛⠉⠉⠉⠀⠀⠀⠀`;
const genie_image2 = `
⠀⠀⠀⠀⠀⢀⣴⣾⣿⣿⣿⣿⣷⣦⡀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢸⣿⠟⠋⣉⣉⠙⠻⣿⡇⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠉⢠⣾⣿⣿⣷⡄⠉⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⣀⣤⡄⠘⣿⣿⣿⣿⠃⢠⣤⣄⡀⠀⠀⠀
⠀⢀⣴⣿⣿⣿⣿⣦⣈⠉⠉⣁⣴⣿⣿⣿⣿⣷⣄⠀
⠀⣾⣿⣿⣿⡿⠛⠛⠛⠛⠛⠛⠛⠛⢿⣿⣿⣿⣿⣧
⢸⣿⣿⣿⣿⣷⣤⣤⣤⡄⢠⣤⣤⣤⣾⣿⣿⣿⣿⣿
⠀⢻⣿⣿⣿⣿⣿⣿⡿⠁⠀⢻⣿⣿⣿⣿⣿⣿⣿⠏
⠀⠀⠙⠻⠿⠿⠟⠛⢁⣼⣷⣄⠙⠛⠿⠿⠿⠟⠁⠀
⠀⠀⠀⠀⠠⣤⣶⣾⣿⣿⣿⣿⣿⣶⣶⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⡀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠙⠿⣿⣿⣿⣿⣿⣿⣿⣿⣄⡀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠻⠿⢿⣿⣿⣿⣿⣷⠄`;

const genie_img2 = CH.vcenter(genie_image2.split('\n'), genie_img.split('\n').length, Math.max(...genie_img.split('\n').map(line => line.length))).join('\n');

const genies = [
    {
        name: 'Zephiroth the Red Genie!',
        color: Colors.RED,
    },
    {
        name: 'Calidra the Blue Genie!',
        color: Colors.BLUE,
    },
    {
        name: 'Azarmis the Green Genie!',
        color: Colors.GREEN,
    },
    {
        name: 'Faerithan the Yellow Genie!',
        color: Colors.YELLOW,
    },
    {
        name: 'Jinnira the Magenta Genie!',
        color: Colors.MAGENTA,
    }
];



class Genie {
    #color;
    #name;
    constructor() {
        const genieSeed = Math.floor(Math.random() * 5)
        this.missBehaviour = Math.random().toFixed(2);
        this.#name = genies[genieSeed].name;
        this.#color = genies[genieSeed].color;
    }

    #shortName() {
        return this.#name.substring(0, this.#name.indexOf(' '));
    }
    introduce() {
        this.speak(`
Greetings Adventurer,
I am ${this.#name}
Welcome to the Great ConsoleAdventure!`,
            [{
                text: this.#name.substring(0, this.#name.indexOf(' ')),
                color: this.#color
            },
            {
                text: 'Console',
                color: Colors.GREEN
            },
            {
                text: 'Adventure!',
                color: Colors.YELLOW
            }]
        );
    }
    generateName() {
        const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'];
        return consonants[Math.floor(Math.random() * consonants.length)].toUpperCase() + 'andy';
    }
    goodbye(name) {
        if (!name)
            name = "You";
        const goodbye = ["Goodbye! I will miss you!", "Hasta la vista, baby!", `${name}, shall be missed!`, `Farewell, ${this.#shortName()} shall miss you!`, `Oh, never thought ${name} would quit so easily!`, `Ha, I knew ${name} could not make it!`];
        const seed = Math.floor(Math.random() * goodbye.length);
        const width = process.stdout.columns;
        this.speak(CH.hcenter(goodbye[seed], width / 3),
            {
                text: this.#shortName(),
                color: this.#color
            }
        );
    }
    smirk(_class) {
        if (typeof (_class) !== 'string')
            this.speak(`Ha, That may be a class but may also be a structure!`);
        else
            this.speak(`Oh, a ${_class}! How original!`,
                class_colors);
    }
    explainGame() {
        const move = `
You can choose options with A and D keys
(and sometimes with W and S keys),
and use Spacebar to select the option.`;
        this.speak(move,
            [
                {
                    text: [' A ', ' D ', ' W ', ' S '],
                    color: Colors.GREEN,
                    decoration: Decorations.Bold
                },
                {
                    text: 'Spacebar',
                    color: Colors.YELLOW
                }

            ]
        );
        let choice = -1;
        while (choice != 0 && choice != 1) {
            choice = CH.SelectValue(['Continue', 'Go on', `I don't like you`, 'Quit'], {
                start: Math.max(0, choice)
            }, true);
            if (choice == 0 || choice == 1) {
                CH.clear_screen();
                this.speak('Great! Let\'s embark on this jurney!');
            }
            else if (choice == 2) {
                const responses = [
                    `Oh, you don’t like me? How unfortunate... for you. I’m ${this.#name} Like it or not, I’m all you’ve got!`,
                    `Tsk tsk, feelings aren’t mutual. I am ${this.#name.substring(0, this.#name.length-1)} after all. Shall we get on with it?`,
                    `Dislike me? Too bad! I’m ${this.#name} and YOU summoned me!`,
                    `Ah, the cold shoulder. Classic! Well, you’re stuck with ${this.#name}`,
                    `Not a fan? Lucky for me, I’m not here for approval! I’m ${this.#name}`,
                    `How DARE you puny mortal! I’m ${this.#name.substring(0, this.#name.indexOf(' '))} the Great Whi.. ... I mean I'm ${this.#name} and I am here to serve you!`
                ];
                const genieSeed = Math.floor(Math.random() * 6)
                CH.clear_screen();
                const width = CH.getWidth();
                this.speak(breakLine(responses[genieSeed], width / 2),
                    {
                        text: this.#name.substring(0, this.#name.indexOf(' ')),
                        color: this.#color
                    }
                );
            }
            else if (choice == 3) {
                CH.clear_screen();
                this.goodbye();
                process.exit();
            }
        }

    }
    speak(sentence, colors = {}, rightSprite) {
        var genieLines = genie_img;
        if (Math.random() > 0.5)
            genieLines = genie_img2;

        const width = Math.max(...genieLines.split('\n').map(line => line.length));
        let final_sentence = sentence;
        if (rightSprite)
            final_sentence = CH.breakLine(sentence, CH.getWidth() / 4);
        let final_sprite = CH.merge(genieLines, createBubble(final_sentence));
        if (rightSprite)
            final_sprite = CH.merge(final_sprite, rightSprite,
                {
                    right: {
                        align: "vcenter"
                    }
                });
        else 
            final_sprite = CH.hcenter(final_sprite, CH.getWidth());  
        final_sprite = CH.paintSprite(final_sprite, width, this.#color);

        if (colors) {
            if (!Array.isArray(colors))
                colors = [colors];
        }
        if (Array.isArray(colors)) {
            colors.forEach(item => {
                let format = {
                    color: item.color,
                    decoration: item.decoration,
                    background: item.background
                }
                let textArray = [];
                if (!Array.isArray(item.text))
                    textArray = [item.text];
                else
                    textArray = item.text;
                textArray.forEach(text => final_sprite = final_sprite.replaceAll(text, CH.insert_format(format, text)));

            });
        }
        CH.print(final_sprite);
    }
}

function createBubble(text) {
    const lines = text.split('\n');
    const maxLength = Math.max(...lines.map(line => line.length));

    const border = ' '.repeat(maxLength + 4);
    const bubbleTop = ` ${'_'.repeat(maxLength + 4)} `;
    const bubbleBottom = `\\${'-'.repeat(maxLength + 4)}/ `;

    const bubbleMiddle = lines.map(line => {
        const totalPadding = maxLength - line.length + 2;
        const leftPadding = Math.ceil(totalPadding / 2);
        const rightPadding = totalPadding - leftPadding;
        return `| ${' '.repeat(leftPadding)}${line}${' '.repeat(rightPadding)} |`;
    }).join('\n');

    return `${bubbleTop}\n/${border}\\\n${bubbleMiddle}\n|${border}|\n${bubbleBottom}`;
}

module.exports = { Genie, genie_img, genie_img2 };