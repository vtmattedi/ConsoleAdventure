class DevMode {
    static #instance
    #value = false
    constructor() {
        if (!DevMode.#instance) {
            DevMode.#instance = new DevMode();
        }
        else
            return this
    }

    static getInstance() {
        return DevMode.#instance;
    }

    get value ()
    {
        return this.#value
    }

    setValue(value)
    {
        this.#value = value
    }

    
}

module.exports = {DevMode};