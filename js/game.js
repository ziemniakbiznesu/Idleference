
class Game {
    constructor() {
        /** @type {GameState} */
        this.state = new GameState();

        /** @type {Options} */
        this.options = new Options();

        this.listeners = new ListenersController();
        this.intervals = new IntervalsController();
    }

    init() {
        this.listeners.init();
        this.intervals.init();
    }

    save() {
        localStorage.setItem("state", JSON.parse(this.state));
        localStorage.setItem("options", JSON.parse(this.options));
    }

    load() {
        this.state = JSON.parse(localStorage.getItem("state")) || this.state;
        this.options = JSON.parse(localStorage.getItem("options")) || this.options;
    }
}

class GameState {
    constructor() {
        this.signals = 0;
        this.anomalies = 0;
        
        this.anomaly = {
            chance: 0.01,
            multiplier: () => (this.prestige + 1) * 0.01,
        };

        this.prestige = 0;
        this.upgrades = [new Upgrade0(), new Upgrade1()];
    }
    
    load() {
        
    }
}

class Options {
    constructor(
        theme = Options.THEME.DARK,
        simulation = Options.SIMULATION.FAST,
        notation = Options.NOTATION.SCIENFIFIC
    ) {
        this.theme = theme;
        this.simulation = simulation;
        this.notation = notation;
    }

    static THEME = {
        DARK: 0,
        LIGHT: 1
    };

    static SIMULATION = {
        FAST: 0,
        SLOW: 1
    };

    static NOTATION = {
        SCIENFIFIC: 0,
        STANDARD: 1
    }
}