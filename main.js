const setTitle = require('console-title');
const { Game } = require('./Game.js');
const {GameColors} = require('./Base/GameColors.js')
const { Genie, genie_img } = require('./Genie.js');
const { Player } = require('./Classes/Player.js');
const Enemy = require('./Enemies/Enemies.js');
const Assets = require('./Assets/Assets.js');

const ConsoleImpl = require ('./Base/ConsoleHelp.js');
const CH = new ConsoleImpl.ConsoleImplementation_x86();
const Colors = ConsoleImpl.DefaultColors;
const { Mage, Warrior, Rogue } = require('./Classes/GameClasses.js');
const { equipaments, genEquipament, Equipament } = require('./Base/Equipament.js');
const { Weapon, weapons } = require('./Base/Weapons.js');
const { Consumable } = require('./Base/Consumables.js');
const { Menu } = require('./Menu.js');
setTitle('Console Adventure Game');

const currentGame = new Game('Adventure');
const genie = new Genie();
let player = new Mage("Andy");

/*Test Area*/
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
        CH.clear_screen();
        CH.print(a)
        CH.print(Assets.Logos.paintedMattediWorks(true, a));
        //Assets.Logos.paintedMattediWorks(true,a);
        
    }
    process.exit();
    
}// CH.print(selectOption(["Save","Load","Continue", "Exit"]));
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
}// CH.print(selectOption(["Save","Load","Continue", "Exit"]));

if (false) {
    CH.clear_screen();
    CH.print(CH.getWidth());
    const b = new Enemy.Boss("Andy",100,15)
    b.health = 0 * b.maxHealth;
    CH.print(b.generateEnemyInfo());
    genie.speak("Hello Adventurer! What is your name?");
    genie.speak("Hello Adventurer! What is your name?", {},b.generateEnemyInfo());
    process.exit();
}

const MIN_WIDTH = 87;

CH.show_cursor(false);
CH.clear_screen();
const current_width = CH.getWidth();
if (current_width  < MIN_WIDTH) {
    let error = `Warning: Your terminal window is too small to play the game properly. Please resize the window to at least 87 characters wide. (current width: ${current_width}) Graphics won't be displayed properly.`;
    error =  CH.breakLine(error, current_width - 2);
    error = error.replace("Warning", CH.insert_color(Colors.RED, "Warning"));
    error = error.replace(`${MIN_WIDTH}`, CH.insert_color(Colors.YELLOW, `${MIN_WIDTH}`));
    error = error.replace(`${current_width}`, CH.insert_color(Colors.YELLOW, `${current_width}`));
    CH.print(CH.insert_color(Colors.RED, error));
}
CH.pressSpace("to start")

// CH.print(createBubble(genie_img));

//hide cursor

Assets.Logos.animate(
    Assets.Logos.ConsoleAdventure,
    15,
    {
        color: Colors.GREEN,
        index: Assets.Logos.ca_cutoff,
        bgcolor: Colors.YELLOW
    }
);

CH.pressSpace("to start");
CH.clear_screen();

let sel = Menu.startMenu();

while (sel) {
    if (sel == 3) {
        CH.clear_screen();
        genie.goodbye();
        process.exit();
    }
    else if (sel == 2) {
        Menu.infoMenu(genie);
    }
    sel = Menu.startMenu(Math.max(sel, 0));
}

CH.clear_screen();
genie.introduce();
player.PlayerInfo();
CH.pressSpace();
CH.clear_screen();
player.PlayerInfo();
genie.explainGame();
CH.pressSpace();
CH.clear_screen();
genie.speak('Hello again Adventurer!\nI didn\'t catch your name. What was it?');
const playerName = CH.question(CH.insert_color(Colors.YELLOW, '\tMy name is: '));
const nameSeed = Math.random();
let newName = playerName.trim();
CH.clear_screen();

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
CH.clear_screen();
genie.speak(`What Are You?`);
const class_options = ['Warrior', 'Mage', 'Rogue'];
const class_sel = CH.SelectValue(class_options.map(item => `I'm a ` + item), {
    start: 0,
    colors: GameColors.class_colors,
    padding: 10
}, true, false);
CH.clear_screen();
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
    CH.clear_screen();
    genie.speak('What will you do?', {}, currentGame.currentEnemy.generateEnemyInfo());
    if (feedback !== "") {
        CH.print(CH.hcenter(feedback, width));
        feedback = "";
        CH.print();
    }
    CH.print(player.PlayerInfo());
    CH.print();
    
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
                CH.clear_screen();
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
        CH.clear_screen();
        genie.speak('You have found an equipament!');
        const equip_seed = (Math.random() * loot.length - 1).toFixed(0);;
        let equipament = loot[equip_seed];
        CH.print(loot.map((item, index) => `${index}: ${item.name} [${item.constructor.name}]`));
        player.findEquipament(equipament);
    }
    else if (choice === PlayerChoice.length - 1) {
        CH.clear_screen();
        genie.goodbye(player.name);
        CH.pressSpace();
    }
    else {
        const atk = player.selectAttack();
        if (atk === -1) {
            continue;
        }
        else {
            feedback = "You used: " + CH.insert_color(GameColors.weapon_colors.find(item => item.text === player.attacks[atk].attackType).color, player.attacks[atk].name) + " at the enemy!";
            const enemy_res = player.attackTarget(atk, currentGame.currentEnemy);
            feedback += " dmg: " + enemy_res.damageTaken + "| dmg_res: " + enemy_res.damageResisted + "! " + (enemy_res.isDead ? " Enemy is dead!" : "hp:" + currentGame.currentEnemy.health) + (enemy_res.critical ? " Critical Hit!" : "");
            const enemy_atk = currentGame.currentEnemy.randomAttack();
            const player_res = player.takeDamage(enemy_atk.calculateDamage(currentGame.currentEnemy.getStats()));
            feedback += "\n" + ` [${currentGame.currentEnemy.getDifficulty()}]` + CH.insert_color(Colors.RED, currentGame.currentEnemy.name) + `(${currentGame.currentEnemy.level}) used:` + CH.insert_color(GameColors.weapon_colors.find(item => item.text === enemy_atk.attackType).color, enemy_atk.name) + " at you!";
            feedback += " dmg: " + player_res.damageTaken + "| dmg_res: " + player_res.damageResisted + "!" + (player_res.isDead ? " You are dead!" : "") + (player_res.critical ? " Critical Hit!" : "");
        }
        if (player.isDead()) {
            while (true) {        
                CH.clear_screen();
                genie.speak('You have died!');
                CH.print(feedback);
                CH.print()
                player.printInfo();
                CH.print()
                const new_choice = Menu.gameEnd();
                if (new_choice === 1) {
                    CH.pressSpace();
                    CH.clear_screen();
                    genie.goodbye();
                    process.exit();
                }
            }
        }
        else if (currentGame.currentEnemy.isDead()) {
            CH.clear_screen();
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
            currentGame.currentEnemy = currentGame.generateEnemy(player.level);
            player.gainExp(xp);
            CH.print("\n")
            player.PlayerInfo();
            CH.pressSpace();
        }
    }
}
