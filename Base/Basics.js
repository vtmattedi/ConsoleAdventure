
rollDice = (sides) => {
    return Math.floor(Math.random() * sides) + 1;
}

// Should be an Interface but Will switch to TS at this point


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
    takeDamage(Attack)
    {
        let damage = Math.max(Attack.getDamage()["physical_damage"], Attack.getDamage()["magic_damage"]);
        let critical = rollDice(20) == 20;
        if (critical) {
            damage *= 2;
        }
        let damageTaken = damage * (1 - this.magic_resist/100) * (1 - this.armor/100);
        damageTaken = Math.round(damageTaken);
        let damageResisted = damage - damageTaken;
        
        this.health -= damageTaken;
        return {  
            damageTaken: damageTaken,
            damageResisted: damageResisted,
            critical: critical,
            isDead: this.isDead()
        };
    }
    isDead() {
        return this.health <= 0;
    }

}


module.exports = {  Unit, rollDice };

