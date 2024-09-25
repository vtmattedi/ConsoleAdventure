class DevMode {
    static #instance = null
    #value = false // Do not change directly, use setValue() (assure type is boolean) and handles toggle
    #gameInstance = null
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

    get value() {
        return this.#value
    }

    setValue(value) {
        if (typeof value !== "boolean") {
            this.#value = !this.#value;
        }
        else
            this.#value = value
        return this.#value
    }

    set gameInstance(value) {
        this.#gameInstance = value
    }

    get gameInstance() { 
        return this.#gameInstance
    }

}

module.exports = { DevMode };