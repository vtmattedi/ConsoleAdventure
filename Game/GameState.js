class GameState {
    constructor(onCreate, render, changeState, onSelect) {
        this.onCreate = onCreate;
        this.render = render;
        this.changeState = changeState;
        this.onSelect = onSelect;
    }
    onCreate = () => {
            
        }
    changeState =  (input) =>
    {

    }

    render = (current_option) => {

    }

    rerender = () => {
        this.onCreate();
        this.render();

    }

}

module.exports = {GameState};