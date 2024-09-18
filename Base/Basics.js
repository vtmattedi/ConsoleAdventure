
// Should be an Interface but Will switch to TS at this point
class Attack
{
    constructor(damage, attackType)
    {
        this.damage = damage;
        this.attackType = attackType;
    }
}

class Weapon{
    constructor(name, damage, attackType)
    {
        this.name = name;
        this.damage = damage;
        this.attackType = attackType;
    }
}

class Equipament{
    constructor(name)
    {
        this.name = name;
    }
}

class Consumable{
    constructor(name)
    {
        this.name = name;
    }
    use()
    {
        //Abstract Method
        throw new Error("Method not implemented.");
    }
}
module.exports = {Attack, Weapon, Equipament, Consumable};   

