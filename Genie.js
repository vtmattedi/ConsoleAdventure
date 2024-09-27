const ConsoleImpl = require('./Base/ConsoleHelp.js')
const CH = new ConsoleImpl.ConsoleImplementation_x86();
const Colors = ConsoleImpl.DefaultColors
const Decorations = ConsoleImpl.Decorations
const Assets = require("./Assets/Assets.js");
const { GameColors } = require('./Base/GameColors.js');

/*
* Once create the Genie instance, it will be the same instance for the whole session.
*/
class Genie {
    static #instance = null;
    static #genie_pool = [
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
    static #createBubble(text) {
        if (typeof text !== 'string') {
            throw new Error('Text must be a string');
        }
        let lines = text.split('\n');
        let maxLength = Math.max(...lines.map(line => {
            return CH.getLineWidth(line)
        }));
        if (maxLength > CH.getWidth() * 0.6) {
            lines = CH.breakLine(text, Math.round(CH.getWidth() * 0.6)).split('\n');
            maxLength = Math.max(...lines.map(line => {
                return CH.getLineWidth(line)
            }));
        }
        const border = ' '.repeat(maxLength + 4);//top/bottom empity line
        const bubbleTop = ` ${'_'.repeat(maxLength + 4)} `;
        const bubbleBottom = `\\${'-'.repeat(maxLength + 4)}/ `;

        const bubbleMiddle = lines.map(line => {
            ;
            return `| ${CH.hcenter(line, maxLength + 2)} |`;
        }).join('\n');

        return `${bubbleTop}\n/${border}\\\n${bubbleMiddle}\n|${border}|\n${bubbleBottom}`;
    }
    #color;
    #name;
    constructor() {
        if (Genie.#instance) {
            return Genie.#instance;
        }
        else {
            const genieSeed = Math.floor(Math.random() * (Genie.#genie_pool.length - 1))
            this.missBehaviour = Number(Math.random().toFixed(2));
            this.#name = Genie.#genie_pool[genieSeed].name;
            this.#color = Genie.#genie_pool[genieSeed].color;
            Genie.#instance = this;
        }
    }
    static getInstance() {
        if (!Genie.#instance) {
            Genie.#instance = new Genie();
        }
        return Genie.#instance;
    }
    #shortName() {
        return this.#name.substring(0, this.#name.indexOf(' '));
    }
    introduce() {
        this.speak(`
Greetings Adventurer,
I am ${this.#name}
Welcome to the Great ${CH.insert_color(Colors.YELLOW, "Console")} ${CH.insert_color(Colors.GREEN, "Adventure")}!`,
            [{
                text: this.#name.substring(0, this.#name.indexOf(' ')),
                color: this.#color
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
                GameColors.class_colors);
    }
    explainGame() {
        CH.clear_screen();
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
            choice = CH.SelectValue(['Continue', 'Go on', `I don't like you`, 'Exit'], {
                start: Math.max(0, choice),
                colors: [{
                    text: 'Exit',
                    color: Colors.RED
                }]
            }, true);
            if (choice == 0 || choice == 1) {
                CH.clear_screen();
                this.speak('Great! Let\'s embark on this jurney!');
            }
            else if (choice == 2) {
                const responses = [
                    `Oh, you don’t like me? How unfortunate... for you. I’m ${this.#name} Like it or not, I’m all you’ve got!`,
                    `Tsk tsk, feelings aren’t mutual. I am ${this.#name.substring(0, this.#name.length - 1)} after all. Shall we get on with it?`,
                    `Dislike me? Too bad! I’m ${this.#name} and YOU summoned me!`,
                    `Ah, the cold shoulder. Classic! Well, you’re stuck with ${this.#name}`,
                    `Not a fan? Lucky for me, I’m not here for approval! I’m ${this.#name}`,
                    `How DARE you puny mortal! I’m ${this.#name.substring(0, this.#name.indexOf(' '))} the Great Gre.. ... I mean I'm ${this.#name} and I am here to serve you!`
                ];
                const genieSeed = Math.floor(Math.random() * 6)
                CH.clear_screen();
                const width = CH.getWidth();
                this.speak(CH.breakLine(responses[genieSeed], width / 2),
                    [{
                        text: this.#name.substring(0, this.#name.indexOf(' ')),
                        color: this.#color
                    },
                    {
                        text: 'Gre..',
                        color: Colors.LIGHTBLACK_EX
                    },
                    {
                        text: 'Exit',
                        color: Colors.RED
                    }]
                );
            }
            else if (choice == 3) {
                CH.clear_screen();
                this.goodbye();
                process.exit();
            }
        }

        CH.clear_screen();
        this.speak("You can Attack enemies, use items or flee from them. Once you attempt to flee, you can't flee again until you attack again. If you attack an enemy and it lives, it will attack back.");
        CH.pressSpace();

    }
    speak(sentence, colors = {}, rightSprite) {
        var genieLines = Assets.GenieSprite.getSprite();
        const width = Math.max(...genieLines.split('\n').map(line => line.length));
        let final_sentence = sentence;
        if (rightSprite)
            final_sentence = CH.breakLine(sentence, CH.getWidth() / 4);
        let final_sprite = CH.merge(genieLines, Genie.#createBubble(final_sentence));

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

module.exports = { Genie };