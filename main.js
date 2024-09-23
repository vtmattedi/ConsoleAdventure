const setTitle = require('console-title');
const { Game } = require('./Base/Game.js');
const { Genie, genie_img } = require('./Genie.js');
const { Player } = require('./Classes/Player.js');
const Enemy = require('./Enemies/Enemies.js');
const Assets = require('./Assets/Assets.js');
const CH = require('./Base/ConsoleHelp.js');
const rl = require('readline-sync');
const { class_colors, Mage, Warrior, Rogue } = require('./Classes/GameClasses.js');
const { equipaments, genEquipament, Equipament } = require('./Base/Equipament.js');
const { Weapon, weapons } = require('./Base/Weapons.js');
const { Consumable } = require('./Base/Consumables.js');
const { Menu } = require('./Menu.js');
setTitle('Console Adventure Game');
console.clear();
const currentGame = new Game('Adventure');
const genie = new Genie();
let player = new Mage("Andy");

if (false) {
    Menu.infoMenu(genie);
    while (true) {
        const _in = rl.question(">: ");
        let a = {
            color1: _in.split(" ")[0],
            color2: _in.split(" ")[1],
        }
        if (_in === "exit") {
            break;
        }
        CH.show_cursor(true);
        console.clear();
        console.log(a)
        console.log(Assets.Logos.paintedMattediWorks(true, a));
        //Assets.Logos.paintedMattediWorks(true,a);
        
    }
    process.exit();
    
}// console.log(selectOption(["Save","Load","Continue", "Exit"]));
if (false) {
    const c = genEquipament(50);
    player.weapon = new Weapon("Old Stick", 1, "Magic", {
        intelligence: 1,
        dexterity: 1,
        strength: 1,
    });
    player.equipament.push(c[0]);
    player.equipament.push(c[1]);
    player.printInfo();
    CH.pressSpace();
    process.exit();
}// console.log(selectOption(["Save","Load","Continue", "Exit"]));

if (false) {
    console.clear();
    console.log(CH.getWidth());
    const b = new Enemy.Boss("Andy",100,15)
    b.health = 0 * b.maxHealth;
    console.log(b.generateEnemyInfo());
    genie.speak("Hello Adventurer! What is your name?");
    genie.speak("Hello Adventurer! What is your name?", {},b.generateEnemyInfo());
    process.exit();
}


const MIN_WIDTH = 87;

CH.hide_cursor();
if (process.stdout.columns < MIN_WIDTH) {
    let error = 'Warning: Your terminal window is too small to play the game properly. Please resize the window to at least 87 characters wide.';
    error = error.replace("Warning", CH.insert_color(CH.Colors.RED, "Warning"));
    error = error.replace(`${MIN_WIDTH}`, CH.insert_color(CH.Colors.YELLOW, `${MIN_WIDTH}`));
    console.log(CH.insert_color(CH.Colors.RED, error));
}
CH.pressSpace("to start")

// console.log(createBubble(genie_img));

//hide cursor

Assets.Logos.animate(
    Assets.Logos.ConsoleAdventure,
    15,
    {
        color: CH.Colors.GREEN,
        index: Assets.Logos.ca_cutoff,
        bgcolor: CH.Colors.YELLOW
    }
);


CH.pressSpace("to start");
console.clear();

let sel = Menu.startMenu();
while (sel) {
    if (sel == 3) {
        console.clear();
        genie.goodbye();
        process.exit();
    }
    else if (sel == 2) {
        Menu.infoMenu(genie);
    }
    sel = Menu.startMenu(Math.max(sel, 0));
}



console.clear();
genie.introduce();
player.PlayerInfo();
CH.pressSpace();
console.clear();
player.PlayerInfo();
genie.explainGame();
CH.pressSpace();
console.clear();
genie.speak('Hello again Adventurer!\nI didn\'t catch your name. What was it?');
CH.show_cursor(true);
const playerName = rl.question(CH.insert_color(CH.Colors.YELLOW, '\tMy name is: '));
CH.show_cursor(false);
const nameSeed = Math.random();
let newName = playerName.trim();
console.clear();
if (genie.missBehaviour > nameSeed || playerName === "" || typeof playerName === "undefined") {
    newName = genie.generateName();
    genie.speak(`
I do not like the name: ${playerName}!
I shall call you ${newName}.`);
}
else {
    genie.speak(`Nice to meet you ${playerName}!`);
}

CH.pressSpace();
console.clear();
genie.speak(`What Are You?`);
const class_options = ['Warrior', 'Mage', 'Rogue'];
const class_sel = CH.SelectValue(class_options.map(item => `I'm a ` + item), {
    start: 0,
    colors: class_colors,
    padding: 10
}, true, false);
console.clear();
genie.smirk(class_options[class_sel]);
CH.pressSpace();
if (class_sel == 0) {
    player = new Warrior(newName);
}
else if (class_sel == 1) {
    player = new Mage(newName);
}
else {
    player = new Rogue(newName);
}
let feedback = "";
const width = process.stdout.columns;
const loot = genEquipament(50);

const genEnemy = (level) => {
    
    const seed = Math.random();
    if (seed < 0.3) {
        return new Enemy.Minion('Goblin', 18 * level, Math.min(level - 1, 1));
    }
    else if (seed < 0.6) {
        return new Enemy.CommonEnemy('Orc', 20 * level, level);
    }
    else if (seed < 0.8) {
        return new Enemy.Elite('Troll', 22 * level, level);
    }
    else {
        return new Enemy.Boss('Dragon', 25 * level, level + 1);
    }
    
}


genLoot = (level) => {
    const seed = Math.random();
    let new_loot = [];
    if (seed < 0.2 + level * 0.1) {
        new_loot.push(loot[(Math.random() * loot.length - 1).toFixed(0)]);
    }
    else if (seed > 0.9) {
        let w = weapons[(Math.random() * weapons.length - 1).toFixed(0)];
        w.stats = {
            strength: Math.floor(Math.random() * 10 + level) + (w.attackType === "Physical" ? 2 : 0),
            intelligence: Math.floor(Math.random() * 10 + level) + (w.attackType === "Magic" ? 2 : 0),
            dexterity: Math.floor(Math.random() * 10 + level) + (w.attackType === "Hybrid" ? 4 : 0)
        };
        new_loot.push(w);
    }
    return new_loot;
}


const PlayerChoice = ['Attack', 'Flee', 'Equipament', 'Menu'];

while (currentGame.isRunning) {
    console.clear();
    genie.speak('What will you do?', {}, currentGame.currentEnemy.generateEnemyInfo());
    if (feedback !== "") {
        console.log(CH.hcenter(feedback, width));
        feedback = "";
        console.log();
    }
    console.log(player.PlayerInfo());
    console.log();
    
    const choice = CH.SelectValue(PlayerChoice, {
        start: 0,
    }, true);
    
    if (choice == 3) {
        let menu_choice = Menu.gameMenu();
        while (menu_choice != 0) {
            if (menu_choice == 2) {
                Menu.infoMenu(genie);
            }
            else if (menu_choice == 1) {

            }
            else if (menu_choice == 3) {
                genie.explainGame();
                CH.pressSpace("to go back");
            }
            else if (menu_choice == Menu.gameMenuOptions.length - 1) {
                console.clear();
                genie.goodbye();
                process.exit();
            }

            menu_choice = Menu.gameMenu(menu_choice);
        }
    }
    else if (choice == 1) {
        feedback = "You flee from the enemy!";
        CH.pressSpace();
    }
    else if (choice == 2) {
        console.clear();
        genie.speak('You have found an equipament!');
        const equip_seed = (Math.random() * loot.length - 1).toFixed(0);;
        let equipament = loot[equip_seed];
        console.log(loot.map((item, index) => `${index}: ${item.name} [${item.constructor.name}]`));
        player.findEquipament(equipament);
    }
    else if (choice === PlayerChoice.length - 1) {
        console.clear();
        genie.goodbye(player.name);
        CH.pressSpace();
    }
    else {
        const atk = player.selectAttack();
        if (atk == -1) {
            continue;
        }
        else {
            feedback = "You used: " + CH.insert_color(CH.weapon_colors.find(item => item.text === player.attacks[atk].attackType).color, player.attacks[atk].name) + " at the enemy!";
            const enemy_res = currentGame.currentEnemy.takeDamage(player.attacks[atk]);
            feedback += " dmg: " + enemy_res.damageTaken + "| dmg_res: " + enemy_res.damageResisted + "! " + (enemy_res.isDead ? " Enemy is dead!" : "hp:" + currentGame.currentEnemy.health) + (enemy_res.critical ? " Critical Hit!" : "");
            const enemy_atk = currentGame.currentEnemy.randomAttack();
            const player_res = player.takeDamage(enemy_atk);
            feedback += "\n" + ` [${currentGame.currentEnemy.getDifficulty()}]` + CH.insert_color(CH.Colors.RED, currentGame.currentEnemy.name) + `(${currentGame.currentEnemy.level}) used:` + CH.insert_color(CH.weapon_colors.find(item => item.text === enemy_atk.attackType).color, enemy_atk.name) + " at you!";
            feedback += " dmg: " + player_res.damageTaken + "| dmg_res: " + player_res.damageResisted + "!" + (player_res.isDead ? " You are dead!" : "") + (player_res.critical ? " Critical Hit!" : "");
        }
        if (player.isDead()) {
            while (true) {        
                console.clear();
                genie.speak('You have died!');
                console.log(feedback);
                console.log()
                player.printInfo();
                console.log()
                const new_choice = Menu.gameEnd();
                if (new_choice === 1) {
                    CH.pressSpace();
                    console.clear();
                    genie.goodbye();
                    process.exit();
                }
            }
        }
        else if (currentGame.currentEnemy.isDead()) {
            console.clear();
            genie.speak('You have defeated the enemy!');
            const xp = currentGame.currentEnemy.xp_drop;
            const dead_loot = currentGame.currentEnemy.loot;
            dead_loot.forEach((item) => {
                if (item instanceof Weapon) {
                    player.findWeapon(item);
                }
                else if (item instanceof Equipament) {
                    player.findEquipament(item);
                }
                else if (item instanceof Consumable) {
                    player.findConsumable(item);
                }

            });
            currentGame.currentEnemy = genEnemy(player.level);
            currentGame.currentEnemy.loot = genLoot(currentGame.currentEnemy.level);
            player.gainExp(xp);
            console.log("\n")
            player.PlayerInfo();
            CH.pressSpace();
        }
    }
}


