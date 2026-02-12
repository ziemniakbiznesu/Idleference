// Test file, new upgrades

class Upgrade0 {
    constructor(level = 0) {
        this.name = "";
        this.description = "";
        this.level = level;
        this.effect = (state) => 1 + this.level * 0.5;
        this.cost = (state) => 50 * (this.level + 1) * 1.5 ** this.level;
    }
}

class Upgrade1 {
    constructor(level = 0) {
        this.name = "";
        this.description = "";
        this.level = level;
        this.effect = (state) => this.level * (this.level + 1) / 2;
        this.cost = (state) => 500 + (this.level * (this.level + 1) / 2 * 1.6 ** this.level);
    }
}

class Upgrade2 {
    constructor(level = 0) {
        this.name = "";
        this.description = "";
        this.level = level;
        this.effect = (state) => 70 - 10 * this.level;
        this.cost = (state) => ((this.level + 1) * (this.level + 1) / 2) * 200 * 100;
    }
}

class Upgrade3 {
    constructor(level = 0) {
        this.name = "";
        this.description = "";
        this.level = level;
        this.effect = (state) => 0.005 * (1 + this.level);
        this.cost = (state) => 500 * 10 ** this.level;
    }
}