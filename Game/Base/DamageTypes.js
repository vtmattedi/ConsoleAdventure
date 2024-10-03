/// Enum for damage types
class DamageType {
    static get Physical() { return 0; }
    static get Magic() { return 1; }
    static get Hybrid() { return 2; }
}

///Damage instance class <interface>
class Damage {
    #magic_damage // {get; private set}
    #physical_damage// {get; private set}
    constructor(magic_damage, physical_damage) {
        if (typeof magic_damage !== 'number' || typeof physical_damage !== 'number') {
            throw new Error('Damage must be a number');
        }
        this.#magic_damage = magic_damage; //Final
        this.#physical_damage = physical_damage; // Final
    }

    get magic_damage() {
        return this.#magic_damage;
    }

    get physical_damage() {
        return this.#physical_damage;
    }

    // getDamageArray() {
    //     return [this.#physical_damage, this.#magic_damage];
    // }
}

export{DamageType, Damage};