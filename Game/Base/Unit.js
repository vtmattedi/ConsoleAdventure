// This file contains the basic classes and functions that are used in the game
import {Damage} from './DamageTypes.js';

class Unit {
    //All Fake Public
    #combatBuffs = [];
    #maxHealth = 100;
    #health = 100;
    #armor = 1;
    #magic_resist = 1;
    #attacks = [];
    #strength = 1;
    #intelligence = 1;
    #dexterity = 1;

    constructor(maxHealth, armor, magic_resist) {
        this.#maxHealth = maxHealth;
        this.#health = maxHealth;
        this.#armor = armor;
        this.#magic_resist = magic_resist;
        if (maxHealth <= 0) {
            throw new TypeError("Cannot create a dead unit");
        }
    }

    setStats(strength, intelligence, dexterity) {
        this.#strength = strength;
        this.#intelligence = intelligence;
        this.#dexterity = dexterity;
    }

    getStats() {
        return { strength: this.#strength, intelligence: this.#intelligence, dexterity: this.#dexterity };
    }

    getBuffsStats() {
        let stats = { attack: 0, magic_attack: 0, dexterity: 0 };
        for (const buff of this.#combatBuffs) {
            stats.attack += buff.attack;
            stats.magic_attack += buff.magic_attack;
            stats.dexterity += buff.dexterity;
        }
        return stats;
    }

    clearCombatBuffs() {
        this.#combatBuffs = [];
    }

    takeDamage(damage) {
        if (!(damage instanceof Damage)) {
            console.print(damage); //prob should change for ConsoleImplementation
            throw new TypeError("Damage must be an instance of Damage");
        }
        let physical_damage = damage.physical_damage;
        let magic_damage = damage.magic_damage;

        let critical = Math.floor(Math.random() * 20) + 1 === 20;
        if (critical) {
            physical_damage *= 2;
            magic_damage *= 2;
        }
        const attackRoll = Math.floor(Math.random() * 20) + 1;
        const defenseRoll = Math.floor(Math.random() * 20) + 1;
        const totalDamage = Math.round(physical_damage + magic_damage);
        //Damage calculation:
        //Physical Damage Taken is reduced by 1% per point of armor rounded
        //Magic Damage Taken is reduced by 1% per point of magic resist rounded
        //Damage Taken = Physical Damage Taken + Magic Damage Taken 
        let damageTaken = Math.max(Math.round(physical_damage * (1 - this.#armor / 100)), 0) + Math.max(Math.round(magic_damage * (1 - this.#magic_resist / 100), 0));
        let damageResisted = totalDamage - damageTaken;
        damageTaken = Math.round(damageTaken * (1 + (attackRoll - defenseRoll) / 20));
        damageTaken = Number(damageTaken);
        damageResisted = Number(damageResisted);
        this.#health -= damageTaken;
        this.#health = Math.max(0, this.#health);
        return {
            damageTaken: damageTaken,
            damageResisted: damageResisted,
            critical: critical,
            attackRoll: attackRoll,
            defenseRoll: defenseRoll,
            isDead: this.isDead()
        };
    }

    isDead() {
        return this.#health <= 0;
    }

    recoverHealth(amount) {
        if (amount < 0 || typeof amount !== 'number') {
            throw new TypeError("Amount must be a number and positive");
        }
        this.#health += amount;
        this.#health = Math.min(this.#health, this.#maxHealth);
    }

    get maxHealth() {
        return this.#maxHealth;
    }

    get health() {
        return this.#health;
    }

    get armor() {
        return this.#armor;
    }

    get magic_resist() {
        return this.#magic_resist;
    }

    get attacks() {
        return this.#attacks;
    }

    get combatBuffs() {
        return this.#combatBuffs;
    }

    set combatBuffs(buffs) {
        this.#combatBuffs = buffs;
    }

    set maxHealth(value) {
        if (value <= 0) {
            throw new TypeError("Max health must be greater than 0");
        }
        this.#maxHealth = value;
        this.#health = Math.min(this.#health, value);
    }

    set health(value) {
        if (value < 0) {
            throw new TypeError("Health cannot be negative");
        }
        this.#health = Math.min(value, this.#maxHealth);
    }

    set armor(value) {
        if (value < 0) {
            throw new TypeError("Armor cannot be negative");
        }
        this.#armor = value;
    }

    set magic_resist(value) {
        if (value < 0) {
            throw new TypeError("Magic resist cannot be negative");
        }
        this.#magic_resist = value;
    }

    set attacks(value) {
        if (!Array.isArray(value)) {
            throw new TypeError("Attacks must be an array");
        }
        this.#attacks = value;
    }

    get strength() {
        return this.#strength;
    }

    set strength(value) {
        if (value < 0) {
            throw new TypeError("Strength cannot be negative");
        }
        this.#strength = value;
    }

    get intelligence() {
        return this.#intelligence;
    }

    set intelligence(value) {
        if (value < 0) {
            throw new TypeError("Intelligence cannot be negative");
        }
        this.#intelligence = value;
    }

    get dexterity() {
        return this.#dexterity;
    }

    set dexterity(value) {
        if (value < 0) {
            throw new TypeError("Dexterity cannot be negative");
        }
        this.#dexterity = value;
    }
}

export{ Unit };
