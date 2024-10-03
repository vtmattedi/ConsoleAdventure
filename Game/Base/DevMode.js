class DevMode {
    static #instance = null
    #value = false // Do not change directly, use setValue() (assure type is boolean) and handles toggle
    #gameInstance;
    constructor() {
        if (!DevMode.#instance) {
            DevMode.#instance =  this;
            return this
        }
        else
            return this
    }

    static getInstance() {
        if (!DevMode.#instance) {
            DevMode.#instance = new DevMode();
        }
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

export{ DevMode };