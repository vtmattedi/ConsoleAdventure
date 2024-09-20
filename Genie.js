const { merge, Colors, paintSprite, SelectValue, waitFor, pressSpace, insert_color,breakLine, vcenter } = require('./Base/ConsoleHelp.js');

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

const genie_img2 = vcenter(genie_image2.split('\n'), genie_img.split('\n').length, Math.max(...genie_img.split('\n').map(line => line.length))).join('\n');



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
    introduce() {
        this.speak(`
Greetings Adventurer,
I am ${this.#name}!
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
    badName() {
        const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'];	
        return consonants[Math.floor(Math.random() * consonants.length)] + 'andy';
    }

    explainGame() {
        const move = `
You can choose options with a and d keys
(and sometimes with w and s keys).
and use Spacebar to select the option.`;
        this.speak(move,
            [
                {
                    text: [' a ', ' d ', ' w ', ' s '],
                    color: Colors.GREEN
                },
                {
                    text: 'Spacebar',
                    color: Colors.YELLOW
                }

            ]
        );
        let choice = -1;
        while (choice != 0 && choice != 1) {
        choice = SelectValue(['Continue', 'Go on', `I don't like you`, 'Quit'],{
            start: Math.max(0, choice)
        }, true);
        if (choice == 0 || choice == 1) {
            console.clear();
            this.speak('Great! Let\'s embark on this jurney!');
        }
        else if (choice == 2) {
            const responses = [
                `Oh, you don’t like me? How unfortunate... for you. I’m ${this.#name} Like it or not, I’m all you’ve got!`,
                `Tsk tsk, feelings aren’t mutual. I am ${this.#name} after all. Shall we get on with it?`,
                `Dislike me? Too bad! I’m ${this.#name} and YOU summoned me!`,
                `Ah, the cold shoulder. Classic! Well, you’re stuck with ${this.#name}`,
                `Not a fan? Lucky for me, I’m not here for approval! I’m ${this.#name}`,
                `How DARE you puny mortal! I’m ${this.#name.substring(0, this.#name.indexOf(' '))} the Great Whi.. ... I mean I'm ${this.#name} and I am here to serve you!`
            ];
            const genieSeed = Math.floor(Math.random() * 6)
            console.clear();
            const width = process.stdout.columns;
            this.speak( breakLine(responses[genieSeed], width/3),
                {
                    text: this.#name.substring(0, this.#name.indexOf(' ')),
                    color: this.#color
                }
            );
        }
        else if (choice == 3) {
            console.clear();
            this.speak('Goodbye! I will miss you!');
            process.exit();
        }
    }

    }
    speak(sentence, colors = {}) {
        var genieLines = genie_img;
        if (Math.random() > 0.5)
            genieLines = genie_img2;

        const width = Math.max(...genieLines.split('\n').map(line => line.length));
        let final_sprite = merge(genieLines, createBubble(sentence));
        final_sprite = paintSprite(final_sprite, width, this.#color);
        if (Array.isArray(colors)) {
            colors.forEach(item => {
                if (Array.isArray(item.text)) {
                    item.text.forEach(text => final_sprite = final_sprite.replaceAll(text, insert_color(item.color, text)));
                }
                else
                    final_sprite = final_sprite.replaceAll(item.text, insert_color(item.color, item.text));
            });
        }
        else if (colors)
        {
            final_sprite = final_sprite.replaceAll(colors.text, insert_color(colors.color, colors.text));
        }

        console.log(final_sprite);
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

module.exports = { Genie, genie_img, genie_image2 };