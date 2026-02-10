var game = new Game();

document.querySelector('.upg0').addEventListener('click', () => {
    if (game.state.signals < game.state.upgrades[0].cost()) return;
    
    game.state.signals -= game.state.upgrades[0].cost()
    game.state.upgrades[0].level++;
});

document.querySelector('.upg1').addEventListener('click', () => {
    if (game.state.signals < game.state.upgrades[1].cost()) return;
    
    game.state.signals -= game.state.upgrades[1].cost()
    game.state.upgrades[1].level++;
});

function RequiredPrestigeProgress(level) {
    return 250 * level + 1.17 ** level;
}

requestAnimationFrame(function update() {
    requestAnimationFrame(update);

    document.querySelectorAll('.points-ui').forEach(x => x.innerText = notate(game.state.signals));
    document.querySelectorAll('.spoints-ui').forEach(x => x.innerText = notate(game.state.anomalies));

    document.querySelectorAll('.upg0c').forEach(x => x.innerText = notate(game.state.upgrades[0].cost()));
    document.querySelectorAll('.upg0e').forEach(x => x.innerText = notate(game.state.upgrades[0].effect()));
    document.querySelectorAll('.upg0l').forEach(x => x.innerText = notate(game.state.upgrades[0].level));
    document.querySelectorAll('.upg1c').forEach(x => x.innerText = notate(game.state.upgrades[1].cost()));
    document.querySelectorAll('.upg1e').forEach(x => x.innerText = notate(game.state.upgrades[1].effect()));
    document.querySelectorAll('.upg1l').forEach(x => x.innerText = notate(game.state.upgrades[1].level));

    let percent = Math.min(100, game.state.signals * 100 / RequiredPrestigeProgress(game.state.prestige + 1));
    document.querySelector('.level-progress').style.width = `${percent}%`;
    document.querySelector('.level-progress p').innerText = `${Math.floor(percent * 100) / 100}%`;
});

// Earn points function
function earnPoint(multiplier = 1) {
    if (game.options.simulation = Options.SIMULATION.FAST) {
        game.state.signals += (1 + game.state.upgrades[1].effect()) * game.state.upgrades[0].effect() * multiplier;

        if (Math.floor(Math.random() * 1 / game.state.anomaly.chance) == 0) {
            game.state.anomalies += game.state.signals * game.state.anomaly.multiplier() * multiplier;
        }
    }

    if (game.options.simulation = Options.SIMULATION.SLOW) {
        for (let i = 0; i < multiplier; i++) {
            game.state.signals += (1 + game.state.upgrades[1].effect()) * game.state.upgrades[0].effect();
    
            if (Math.floor(Math.random() * 1 / game.state.anomaly.chance) == 0) {
                game.state.anomalies += game.state.signals * game.state.anomaly.multiplier();
            }
        }
    }

    // if (RequiredPrestigeProgress(game.state.prestige + 1) <= game.state.signals) {
        // game.state.signals -= RequiredPrestigeProgress(game.state.prestige + 1);
        // game.state.prestige++;
    // }
}

// Earning points - holding (clicking)
(() => {

    var holding = false;
    var holdingTime = 0;
    var holdingIntervalTime = () => Math.max(250, 250 / (1 + 0.005 * holdingTime));
    var holdingInterval;

    game.listeners.add("mousedown", () => {
        holding = true;
        holdingInterval = setTimeout(tick, holdingIntervalTime());
    });

    game.listeners.add("mouseup", () => {
        holding = false;
        holdingTime = 0;
        clearTimeout(holdingInterval);
    });

    game.intervals.add(100, () => {
        if (holding) {
            holdingTime++;
        }
    });

    function tick() {
        earnPoint();
        holdingInterval = setTimeout(tick, holdingIntervalTime());
    }
})();




game.init();