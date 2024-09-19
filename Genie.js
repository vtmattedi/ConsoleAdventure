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

const {insert_color, Colors} = require('./Base/ConsoleHelp.js');

class Genie
{
    static speak(sentence, options = {}) {
        var genieLines = genie_img.split('\n');
        if (Math.random() > 0.5 )
             genieLines = genie_image2.split('\n');
        const sentenceLines = createBubble(sentence).split('\n');
        const maxLength = Math.max(...genieLines.map(line => line.length));

        // handle large sentences
        if  (sentenceLines.length > genieLines.length)
        {
            const diff = sentenceLines.length - genieLines.length;
            let center = false;
            for (let i = 0; i < diff; i++)
            {
                //Keep centered
                if (center)
                    genieLines.push(' '.repeat(maxLength));
                else
                    genieLines.unshift(' '.repeat(maxLength));
                center = !center;
            }           
        }
        
        let mergedLines = genieLines.map((line, index) => {
            const sentenceLine = sentenceLines[index] || '';
            return line.padEnd(maxLength, ' ') + ' '.repeat(4) + sentenceLine;
        
        }).join('\n');
        if (options.textColors) {
            options.textColors.forEach(({text, color}) => {
                mergedLines = mergedLines.replace(text, insert_color(color, text));
            });
        }
        console.log(mergedLines);
    }
}

function createBubble(text) {
    const lines = text.split('\n');
    const maxLength = Math.max(...lines.map(line => line.length));

    const border = ' '.repeat(maxLength + 4);
    const bubbleTop = ` ${'_'.repeat(maxLength + 4)} `;
    const bubbleBottom = `\\${'-'.repeat(maxLength + 4)}/ `;

    const bubbleMiddle = lines.map(line => {
        const totalPadding = maxLength - line.length + 2 ;
        const leftPadding = Math.ceil(totalPadding / 2);
        const rightPadding = totalPadding - leftPadding;
        return `| ${' '.repeat(leftPadding)}${line}${' '.repeat(rightPadding)} |`;
    }).join('\n');

    return `${bubbleTop}\n/${border}\\\n${bubbleMiddle}\n|${border}|\n${bubbleBottom}`;
}

module.exports = {Genie, genie_img, genie_image2};