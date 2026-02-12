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

document.querySelector('.upg2').addEventListener('click', () => {
    if (game.state.signals < game.state.upgrades[2].cost()) return;
    
    game.state.signals -= game.state.upgrades[2].cost()
    game.state.upgrades[2].level++;
});

document.querySelector('.upg3').addEventListener('click', () => {
    if (game.state.signals < game.state.upgrades[3].cost()) return;
    
    game.state.signals -= game.state.upgrades[3].cost()
    game.state.upgrades[3].level++;
});

document.querySelector('.level-progress-button').addEventListener('click', () => {
    console.log('a');
    LevelUp();
});

function RequiredPrestigeProgress(level) {
    return 250 * level + 1.17 ** level;
}

requestAnimationFrame(function update() {
    requestAnimationFrame(update);

    document.querySelectorAll('.points-ui').forEach(x => x.innerText = notate(game.state.signals));
    document.querySelectorAll('.spoints-ui').forEach(x => x.innerText = notate(game.state.anomalies));

    document.querySelectorAll('.upg0c').forEach(x => x.innerText = notate(game.state.upgrades[0].cost(game.state)));
    document.querySelectorAll('.upg0e').forEach(x => x.innerText = notate(game.state.upgrades[0].effect(game.state)));
    document.querySelectorAll('.upg0l').forEach(x => x.innerText = notate(game.state.upgrades[0].level));
    document.querySelectorAll('.upg1c').forEach(x => x.innerText = notate(game.state.upgrades[1].cost(game.state)));
    document.querySelectorAll('.upg1e').forEach(x => x.innerText = notate(game.state.upgrades[1].effect(game.state)));
    document.querySelectorAll('.upg1l').forEach(x => x.innerText = notate(game.state.upgrades[1].level));
    document.querySelectorAll('.upg2c').forEach(x => x.innerText = notate(game.state.upgrades[2].cost(game.state)));
    document.querySelectorAll('.upg2e').forEach(x => x.innerText = notate(game.state.upgrades[2].effect(game.state)));
    document.querySelectorAll('.upg2l').forEach(x => x.innerText = notate(game.state.upgrades[2].level));
    document.querySelectorAll('.upg3c').forEach(x => x.innerText = notate(game.state.upgrades[3].cost(game.state)));
    document.querySelectorAll('.upg3e').forEach(x => x.innerText = notate(game.state.upgrades[3].effect(game.state)));
    document.querySelectorAll('.upg3l').forEach(x => x.innerText = notate(game.state.upgrades[3].level));


    let percent = Math.min(100, game.state.signals * 100 / RequiredPrestigeProgress(game.state.prestige + 1));
    document.querySelector('.level-progress').style.width = `${percent}%`;
    document.querySelector('.level-progress p').innerText = `${Math.floor(percent * 100) / 100}%`;

    document.querySelector('.level-progress-button').style.display = percent == 100 ? 'block' : 'none';
});

function SignalGetAmount() {
    return (1 + game.state.upgrades[1].effect()) * game.state.upgrades[0].effect();
}

// Earn points function
function earnPoint(multiplier = 1) {
    if (game.options.simulation = Options.SIMULATION.FAST) {
        game.state.signals += SignalGetAmount() * multiplier;

        if (Math.floor(Math.random() * 1 / game.state.anomaly.chance) == 0) {
            game.state.anomalies += SignalGetAmount() * game.state.anomaly.multiplier() * multiplier;
        }
    }

    if (game.options.simulation = Options.SIMULATION.SLOW) {
        for (let i = 0; i < multiplier; i++) {
            game.state.signals += SignalGetAmount();
    
            if (Math.floor(Math.random() * 1 / game.state.anomaly.chance) == 0) {
                game.state.anomalies += SignalGetAmount() * game.state.anomaly.multiplier();
            }
        }
    }
}

function holdAnimationHandler(x, y) {
    var coin = document.createElement('div');
    coin.classList.add("coin-drop");
    coin.style.left = `${x - 42 + Math.floor(Math.random() * 84)}px`;
    coin.style.top = `${y - 42 + Math.floor(Math.random() * 84)}px`;

    var img = document.createElement('img');
    img.src = './point.png';

    coin.appendChild(img);

    setTimeout(() => document.body.appendChild(coin), 80);
    setTimeout(() => coin.remove(), 1000);
}

function LevelUp() {
    if (RequiredPrestigeProgress(game.state.prestige + 1) <= game.state.signals) {
        game.state.signals -= RequiredPrestigeProgress(game.state.prestige + 1);
        game.state.prestige++;
    }
}

// Earning points - holding (clicking)
(() => {

    var holding = false;
    var holdingTime = 0;
    var holdingIntervalTime = () => Math.max(game.state.upgrades[2].effect(), 500 / (1 + game.state.upgrades[3].effect() * holdingTime));
    var holdingInterval;
    var mx = 0, my = 0;

    game.listeners.add("mousedown", () => {
        holding = true;
        holdingInterval = setTimeout(tick, holdingIntervalTime());
    });

    game.listeners.add("mouseup", () => {
        holding = false;
        holdingTime = 0;
        clearTimeout(holdingInterval);
    });

    game.listeners.add("mousemove", e => {
        mx = e.x;
        my = e.y;
    });

    game.intervals.add(100, () => {
        if (holding) {
            holdingTime++;
        }
    });

    function tick() {
        earnPoint();
        holdAnimationHandler(mx, my);
        holdingInterval = setTimeout(tick, holdingIntervalTime());
    }
})();




game.init();