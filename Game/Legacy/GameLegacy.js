// Purpose: Game class to handle the game logic.
const ConsoleImpl = require('../Base/ConsoleHelp.js');
const CH = new ConsoleImpl.BasicConsole();
const Colors = ConsoleImpl.DefaultColors;
const { GameColors } = require('../Base/GameColors.js');
const { PlayerFactory } = require('../Classes/GameClasses.js');
const Enemy = require('../Enemies/Enemies.js');
const { Menu, BattleMenuOptions, GameMenuOptions, GameEndOptions } = require('../Menu.js');
const { DamageType } = require('../Base/DamageTypes.js');
const { Weapon } = require('../Base/Weapons.js');
const { DevMode } = require('../Base/DevMode.js');
const { Genie } = require('../Genie.js');
const { HealthPotion, Potion } = require('../Base/Consumables.js');
const { EquipamentUtils, Equipament } = require('../Base/Equipament.js');
const genie = new Genie()


class Game {

    #player = new PlayerFactory().createPlayer("Cheater", "Warrior"); // {get; private set}
    #currentEnemy = new Enemy.Enemy(); // {get; private set}
    #isRunning = false;//{get; private set}
    #fleeAttempt = 0; //strictly private
    #exitGame = false; // {get; private set} game exit flag
    #feedback = ""; // strictly private
    constructor() {
        this.#currentEnemy = new Enemy.Minion("Bob", 10, 1, {
            strength: 5,
            intelligence: 2,
            dexterity: 3,
        });
        new DevMode().gameInstance = this;
    }


    get player() {
        return this.#player;
    }

    get currentEnemy() {
        return this.#currentEnemy;
    }

    get isRunning() {
        return this.#isRunning;
    }

    get exitGame() {
        return this.#exitGame;
    }

    handleKeyPress(key) {
    }

    startGame() {
        this.#feedback = "";
        CH.clear_screen();
        genie.speak('Hello again Adventurer!\nI didn\'t catch your name. What was it?');
        const playerName = CH.question(CH.insert_color(Colors.YELLOW, '\tMy name is: '));
        const nameSeed = Math.random();
        let newName = playerName.trim();
        CH.clear_screen();

        if (genie.missBehaviour > nameSeed || playerName === "" || typeof playerName === "undefined") {
            newName = genie.generateName();
            let phrase = `I do not like the name: ${CH.insert_format(
                {
                    decoration: [ConsoleImpl.Decorations.Bold, ConsoleImpl.Decorations.Underlined]
                }
                , playerName)}!`;
                if (playerName === "" || typeof playerName === "undefined")
                    phrase = "Funny you are, but smart are not!"
            genie.speak(`${phrase}
I shall call you ${CH.insert_format(
                    {
                        decoration: [ConsoleImpl.Decorations.Bold, ConsoleImpl.Decorations.Underlined]
                    }
                    , newName)}.`);
        }
        else {
            genie.speak(`Nice to meet you ${CH.insert_format(
                {
                    decoration: [ConsoleImpl.Decorations.Bold, ConsoleImpl.Decorations.Underlined]
                }
                , playerName)}!`);
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
        this.#player = new PlayerFactory().createPlayer(newName, class_options[class_sel]);
        CH.clear_screen();

        const intro = `Welcome to the Magical Lands, ${newName}. In this vast world of enchanted forests, towering mountains, and forgotten ruins, you stand on the edge of an epic journey. In an age when magic flows through the veins of the earth, and ancient beasts roam untamed, the realm is on the brink of collapse. The shadow of a long-forgotten evil stirs once more, threatening to shroud the land in darkness. The fate of the Magical Lands rests on your shoulders. Will you rise to the challenge, forging alliances, battling dark forces, and uncovering the secrets of a forgotten age? Your adventure begins now... But be aware of that sneaky grey gen... ... ... Wait who wrote this?.`;
        genie.speak(CH.breakLine(intro, CH.getWidth() / 2),
            [
                {
                    text: 'Magical Lands',
                    color: Colors.GREEN
                },
                {
                    text: 'grey gen',
                    color: Colors.LIGHTBLACK_EX
                },
                {
                    text: newName,
                    color: GameColors.class_colors[class_sel].color

                }
            ]
        );
        CH.pressSpace();
        this.#isRunning = true;
        this.#encounterNewEnemy();
    }

    exitTheGame() {
        this.#exitGame = true; // Exit game
        this.#isRunning = false;// Stop game loop
        //goodbye message
        CH.clear_screen();
        genie.goodbye(this.#player.name);

    }
    generateEnemy(level) {
        if (typeof level !== "number") {
            throw new Error("level must be a number");
        }
        level = Math.round(level);
        const seed = Math.random();
        let new_enemy = new Enemy.Minion('Goblin', 18 * level, Math.max(level - 1, 1));
        if (seed < 0.3) {
            //Minion
        }
        else if (seed < 0.6) {
            new_enemy = new Enemy.CommonEnemy('Orc', 20 * level, level);
        }
        else if (seed < 0.8) {
            new_enemy = new Enemy.Elite('Troll', 22 * level, level);
        }
        else {
            new_enemy = new Enemy.Boss('Dragon', 25 * level, level + 1);
        }
        //generate loot

        const genLoot = (loot_level) => {

            const seed = Math.random();
            let new_loot = [];
            const EquipmentLoot = EquipamentUtils.genEquipament(50);

            if (seed < 0.2 + loot_level * 0.01) {
                const equip_seed = Math.random();
                new_loot.push(EquipmentLoot[Math.floor((equip_seed * EquipmentLoot.length - 1))]);
            }
            else if (seed > 0.9) {
                let w = Weapon.genRandomWeapon(loot_level)
                new_loot.push(w);
            }
            const potion_seed = Math.random();
            if (potion_seed < 0.2 + loot_level * 0.01) {
                const hp_seed = Math.random();
                let hp_pot = new HealthPotion('Large Hp Pot', 30);
                if (hp_seed < 0.5) {
                    hp_pot = new HealthPotion('Small Hp Pot', 10);
                }
                else if (hp_seed < 0.8) {
                    hp_pot = new HealthPotion('Medium Hp Pot', 20);
                }
                new_loot.push(hp_pot);
            }

            return new_loot;

        }
        const loot = genLoot(level);
        if (loot.length > 0) {
            new_enemy.loot = loot;
        }

        this.#currentEnemy = new_enemy;
        return this.#currentEnemy
    }
    
    #encounterNewEnemy() {
        this.#currentEnemy = this.generateEnemy(this.#player.level);
        CH.clear_screen();
        const locations = ['Dark Forest', 'Misty Mountains', 'Forgotten Ruins', 'Enchanted Lake', 'Cursed Swamp', 'Haunted Castle', 'Ancient Temple', 'Mystic Caverns', 'Shadowy Vale', 'Eerie Graveyard'];
        const phrases = [
            `You find yourself in the #loc. Out of nowhere, a #enemy appears!`,
            `While attempting to cross the #loc, a #enemy emerges from the shadows!`,
            `As you explore the #loc, a #enemy suddenly attacks you!`,
            `You stumble upon the #enemy while wandering through the #loc!`,
            `A #enemy jumps out at you as you traverse the #loc!`,
            `You are ambushed by a #enemy in the #loc!`,
            `A #enemy blocks your path in the #loc!`,
            `You are confronted by a #enemy in the #loc!`,
            `A #enemy emerges from the darkness in the #loc!`,
            `You are attacked by a #enemy while exploring the #loc!`,
            `A #enemy suddenly appears in the #loc!`,
            `You are surprised by a #enemy in the #loc!`,
            `A #enemy jumps out at you in the #loc!`,
            `You are ambushed by a #enemy in the #loc!`,
        ]
        const loc = locations[Math.floor(Math.random() * locations.length)];
        const adverbs = ["Fighsty", "Fierce", "Savage", "Vicious", "Brutal", "Ferocious", "Deadly", "Savage", "Ruthless", "Merciless", "Savage", "Vicious", "Brutal", "Ferocious", "Deadly", "Savage", "Ruthless", "Merciless", "Savage"];
        let phrase = phrases[Math.floor(Math.random() * phrases.length)]
        phrase = phrase.replace("#loc", loc)
        phrase = phrase.replace("#enemy",`${adverbs[Math.floor(Math.random() * adverbs.length)]} ${CH.insert_color(Colors.RED, this.#currentEnemy.name)}`);
        genie.speak(CH.breakLine(phrase,CH.getWidth() / 2));
        CH.print();
        CH.pressSpace();
        this.#feedback = "";

    }
    #printBasicFrame() {
        //Clear Screen
        CH.clear_screen();
        //Print Genie + enemy info
        genie.speak([
            `You are facing the ${this.#currentEnemy.name}! `,
            `What will you do?`].join(""),
            {
                text: this.#currentEnemy.name,
                color: Colors.RED
            }, this.#currentEnemy.generateEnemyInfo());
        CH.print();
        //Print feedback (min 2 lines) from last action)
        const feedback_lines = this.#feedback.split("\n");
        feedback_lines.forEach(line => {
            CH.print(CH.hcenter(line, CH.getWidth()));
        });
        if (feedback_lines.length < 2) {
            CH.print();//ln
        }
        CH.print();//ln
        //Print Player Info
        CH.print(this.#player.playerInfo());
        //Let player choose action
        CH.print();//ln
    }

    #checkForDeaths() {
        if (this.#player.isDead()) {
            this.#printBasicFrame();
            CH.pressSpace();
            this.#isRunning = false;
            CH.clear_screen();
            genie.speak("You have been slain by the enemy!");
            const quit = Menu.gameEnd();
            if (quit === GameEndOptions.Exit) {
                this.exitTheGame();
            }
            else {
                this.#isRunning = false;
            }
        }
        else if (this.#currentEnemy.isDead()) {
            this.#printBasicFrame();
            CH.pressSpace();
            CH.clear_screen();
            let phrase = `You have slain ${CH.insert_color(Colors.RED, this.#currentEnemy.name)}!`;
            phrase += `\nYou gain ${CH.insert_color(Colors.YELLOW, this.#currentEnemy.xp_drop)} XP!`;
            if (this.#currentEnemy.loot.length > 0) {
                phrase += `\nYou found: `;
                for (const item of this.#currentEnemy.loot) {
                    phrase += `\n`;
                    if (item instanceof Weapon) {
                        phrase += `The ${CH.insert_color(
                            item.getColor(), item.name
                        )}.`;
                    }
                    else if (item instanceof Potion) {
                        phrase += `A ${CH.insert_color(
                            item.color, item.name)}.`;
                    }
                    else if (item instanceof Equipament) {
                        phrase += `The ${CH.insert_color(
                            GameColors.getEquipamentColor(item), item.name)}.`;
                    }

                }
            }
            genie.speak(phrase);
            this.player.gainXp(this.#currentEnemy.xp_drop);
            if (this.#currentEnemy.loot.length > 0) {
                for (const item of this.#currentEnemy.loot) {
                    if (item instanceof Weapon) {
                        this.#player.findWeapon(item);
                    }
                    else if (item instanceof HealthPotion) {
                        this.#player.findConsumable(item);
                    }
                    else if (item instanceof Equipament) {
                        this.#player.findEquipament(item);
                    }
                }
            }
            CH.pressSpace();
            this.#encounterNewEnemy();
            this.player.recoverHealth(20 * this.player.level%5);
        }
    }
    
    loop() {
        this.#printBasicFrame();
        const action = Menu.battleMenu();
        if (action === BattleMenuOptions.Attack) {
            //Makes an attack name into a third person verb
            const getThirdPerson = (name) => {
                if (typeof name !== "string") {
                    throw new Error("name must be a string");
                }
                if (name.endsWith('s')) {
                    return name + "'";
                }
                else if (name.endsWith('y')) {
                    return name.substring(0, name.length - 1) + 'ies';
                }
                else if (name.endsWith('x') || name.endsWith('z') || name.endsWith('ch') || name.endsWith('sh')) {
                    return name + 'es';
                }
                else
                    return name + 's';
            }
            const attack_index = CH.SelectValue
                (
                    [...this.#player.attacks.map(item => item.name), 'Back'],
                    {
                        start: 0,
                        colors: this.#player.attacks.map(item => {
                            return {
                                text: item.name,
                                color: GameColors.weapon_colors.find(weapon => weapon.text === item.attackType).color
                            }
                        }
                        ),
                        padding: 5
                    },
                    true,
                    false
                );
            // Attack !== Back
            if (attack_index !== this.#player.attacks.length) {
                this.#fleeAttempt = 0;
                //Player Attack
                const attack_res = this.#player.attackTarget(attack_index, this.#currentEnemy);
                const player_atk = this.#player.attacks[attack_index];
                this.#feedback = CH.insert_color(GameColors.class_colors.find(item => item.text === this.#player.getClass()).color, this.#player.name);
                if (player_atk.attackType === DamageType.Magic)
                    this.#feedback += " casts" + CH.insert_color(GameColors.weapon_colors.find(item => item.text === player_atk.attackType).color, ` ${player_atk.name} `);
                else 
                 this.#feedback += CH.insert_color(GameColors.weapon_colors.find(item => item.text === player_atk.attackType).color, ` ${getThirdPerson(player_atk.name)} `);
                this.#feedback += "it for " + CH.insert_color(Colors.RED, attack_res.damageTaken) + " damage! ";
                if (attack_res.damageResisted > 0)
                    this.#feedback += CH.insert_color(Colors.LIGHTBLACK_EX, `(${attack_res.damageResisted} resisted) `);
                if (attack_res.crit) {
                    this.#feedback += CH.insert_color(Colors.YELLOW, "(Critical Hit!) ");
                }
                if (attack_res.isDead) {
                    this.#feedback += CH.insert_color(Colors.LIGHTRED_EX, `Killing it.`);
                }
                this.#feedback += "\n";

                if (!attack_res.isDead) {
                    //Enemy Attack
                    const enemy_atk = this.#currentEnemy.randomAttack();
                    const enemy_res = this.#player.takeDamage(enemy_atk.calculateDamage(this.#currentEnemy.getStats()));
                    this.#feedback += "The " + CH.insert_color(Colors.RED, `${this.#currentEnemy.name}`);
                    this.#feedback += " strikes back, it";
                    if (enemy_atk.attackType === DamageType.Magic)
                        this.#feedback += " casts" + CH.insert_color(GameColors.weapon_colors.find(item => item.text === enemy_atk.attackType).color, ` ${enemy_atk.name} `);
                    else 
                     this.#feedback += CH.insert_color(GameColors.weapon_colors.find(item => item.text === enemy_atk.attackType).color, ` ${getThirdPerson(enemy_atk.name)} `);
                    
                    this.#feedback += ` you dealing ${CH.insert_color(Colors.RED, enemy_res.damageTaken)} damage! `;
                    if (enemy_atk.damageResisted > 0)
                        this.#feedback += CH.insert_color(Colors.LIGHTBLACK_EX, `(${attack_res.damageResisted} resisted) `);
                    if (enemy_atk.crit) {
                        this.#feedback += CH.insert_color(Colors.YELLOW, "(Critical Hit!) ");
                    }
                    if (enemy_atk.isDead) {
                        this.#feedback += CH.insert_color(Colors.LIGHTRED_EX, `Killing you!`);
                    }
                }
                this.#checkForDeaths();
            }

            this.#fleeAttempt = 0;
        }
        else if (action === BattleMenuOptions.Flee) {
            if (this.#fleeAttempt === 0) {
                this.#fleeAttempt = 1 + Math.random();
            }

            if (this.#fleeAttempt > 0) {
                this.#feedback = "You attempt to flee!";
                if ( this.#fleeAttempt > 1.5) {
                    this.#feedback += " and manage to escape!";
                    this.#printBasicFrame();
                    CH.pressSpace();
                    this.#fleeAttempt === 0;
                    this.player.recoverHealth(5 * this.player.level%5);
                    this.#encounterNewEnemy();
                }
                else {
                    this.#feedback += " but you fail to escape!";
                }
            }
        }
        else if (action === BattleMenuOptions.Items) {
            let itemOptions = [];
            this.#player.consumables.forEach(item => {
                let multiple = false;
                for (const option of itemOptions) {
                    if (option.name === item.name) {
                        multiple = true;
                    }
                }
                if (!multiple) {
                    itemOptions.push(item);
                }
            });

            let choice = CH.SelectValue(
              [...itemOptions.map(item => item.name), 'Back'],
                {
                    start: 0,
                    padding: 2,
                    colors: this.#player.consumables.map(item => {
                        return {
                            text: item.name,
                            color: item.color
                        }
                    })
                },
                true,
                false
            );

            while (choice !== itemOptions.length) {
                
                const consumable = this.#player.consumables.find(item => item.name === itemOptions[choice].name);
                this.#feedback = `You use the ${CH.insert_color(consumable.color, consumable.name)}!`;
                this.#player.useConsumable(choice);
                
                this.#printBasicFrame(); // Refresh frame to update stats
                itemOptions = [];
                this.#player.consumables.forEach(item => {
                    let multiple = false;
                    for (const option of itemOptions) {
                        if (option.name === item.name) {
                            multiple = true;
                        }
                    }
                    if (!multiple) {
                        itemOptions.push(item);
                    }
                });
    
                choice = CH.SelectValue(
                    [...itemOptions.map(item => item.name), 'Back'],
                    {
                        start: choice,
                        padding: 2,
                        colors: this.#player.consumables.map(item => {
                            return {
                                text: item.name,
                                color: item.color
                            }
                        })
                    },
                    true,
                    false
                );
            }
        }
        else if (action === BattleMenuOptions.Menu) {
            let finsih = false;
            let menu_sel = 0;
            while (!finsih) {
                menu_sel = Menu.gameMenu(menu_sel);
                if (menu_sel === GameMenuOptions.Continue) {
                    finsih = true;
                }
                else if (menu_sel === GameMenuOptions.MainMenu) {
                    this.#isRunning = false;
                    finsih = true
                }
                else if (menu_sel === GameMenuOptions.SaveGame) {
                    CH.clear_screen();
                    genie.speak("Saving Game...");
                    CH.pressSpace();
                    CH.clear_screen();
                    genie.speak("Saving Game... Has not been implemented yet.\nMuahahahaha!");
                    CH.pressSpace();
                }
                else if (menu_sel === GameMenuOptions.Info) {
                    Menu.infoMenu();
                }
                else if (menu_sel === GameMenuOptions.Help) {
                    genie.explainGame();
                }
                else if (menu_sel === GameMenuOptions.Exit) {
                    this.exitTheGame();
                    finsih = true
                }
            }
        }

        else if (action === BattleMenuOptions.DevButton) {
            this.#currentEnemy = this.generateEnemy(this.player.level);
        }


    }
}

module.exports ={ Game };