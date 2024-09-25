
rollDice = (sides) => {
    return Math.floor(Math.random() * sides) + 1;
}

class Stats {
    constructor(strength, intelligence, dexterity) {
        this.strength = strength;
        this.intelligence = intelligence;
        this.dexterity = dexterity;
    }

}

// Should be an Interface but Will switch to TS at this point
const {Damage} = require('./DamageTypes.js');

class Unit {
    combatBuffs = [];
    constructor(maxHealth, armor, magic_resist) {
        this.maxHealth = maxHealth;
        this.health = maxHealth;
        this.armor = armor;
        this.magic_resist = magic_resist;
        this.strength = 1;
        this.intelligence = 1;
        this.dexterity = 1;
        this.attacks = [];
        if (maxHealth <= 0) {
            throw new TypeError("Cannot create a dead unit");
        }
    }
    setStats(strength, intelligence, dexterity) {
        this.strength = strength;
        this.intelligence = intelligence;
        this.dexterity = dexterity;
    }
    getStats() {
        return { strength: this.strength, intelligence: this.intelligence, dexterity: this.dexterity };
    }
    getBuffsStats() {
        let stats = { attack: 0, magic_attack: 0, dexterity: 0 };
        for (const buff of this.combatBuffs) {
            stats.attack += buff.attack;
            stats.magic_attack += buff.magic_attack;
            stats.dexterity += buff.dexterity;
        }
    }
    clearCombatBuffs() {
        this.combatBuffs = [];
    }
    takeDamage(damage)
    {
        if (!(damage instanceof Damage)) {
            console.log(damage);
            throw new TypeError("Damage must be an instance of Damage");
        }
        let [physical_damage, magic_damage] = damage.getDamageArray();

        let critical = rollDice(20) == 20;
        if (critical) {
            physical_damage *= 2;
            magic_damage *= 2;
        }
        const totalDamage = physical_damage + magic_damage;
        Math.round(totalDamage,2    );
        let damageTaken = Math.max(Math.round(physical_damage * (1 - this.armor/100)), 0) + Math.max(Math.round(magic_damage * (1 - this.magic_resist/100),0));
        let damageResisted = totalDamage - damageTaken;
        damageTaken =  Number(damageTaken.toFixed(2));
        damageResisted = Number(damageResisted.toFixed(2));
        this.health -= damageTaken;
        this.health = Math.max(0, this.health);
        return {  
            damageTaken: damageTaken.toFixed(2),
            damageResisted: damageResisted.toFixed(2),
            critical: critical,
            isDead: this.isDead()
        };
    }
    isDead() {
        return this.health <= 0;
    }

    recoverHealth(amount) {
        if (amount < 0 || typeof amount !== 'number') {
            throw new TypeError("Amount must be a number and positive");
        }
        this.health += amount;
        this.health = Math.min(this.health, this.maxHealth);
    }

}


module.exports = {  Unit, rollDice };

