var points = 0;
var spoints = 0;
var level = 0;

SIMULATIONTYPE = {
    FAST: 0,
    SLOW: 1
};
var simulationType = SIMULATIONTYPE.FAST;


var listeners = [];
var intervals = [];






function notate(x) {
    var e = Math.floor(Math.log10(x));
    var m = Math.floor(x / 10 ** (e - 2)) * 100;

    if (e < 3) {
        return Math.floor(x * 100) / 100;
    } else {
        return `${m}e${e}`;
    }
}

function RequiredLevelProgress(level) {
    return 250 * level + 1.17 ** level;
}


requestAnimationFrame(function update() {
    requestAnimationFrame(update);

    document.querySelectorAll('.points-ui').forEach(x => x.innerText = notate(points));
    document.querySelectorAll('.spoints-ui').forEach(x => x.innerText = notate(spoints));

    let percent = points * 100 / RequiredLevelProgress(level + 1);
    document.querySelector('.level-progress').style.width = `${percent}%`;
    document.querySelector('.level-progress p').innerText = `${Math.floor(percent * 100) / 100}%`;
});

// setInterval(() => {
//     points += 1;
    
//     // console.log(Math.floor(Math.random() * 100))
//     if (Math.floor(Math.random() * 100) == 0) {
//         spoints += points * (0.01 + 0.01 * level);
//     }

//     if (RequiredLevelProgress(level + 1) <= points) {
//         points -= RequiredLevelProgress(level + 1);
//         level++;
//     }


//     // Req - 100
//     // points - w
// }, 50);

// addEventListener('click', () => {
//     points += 20;
    
//     // console.log(Math.floor(Math.random() * 100))
//     if (Math.floor(Math.random() * 100) == 0) {
//         spoints += points * 0.01;
//     }



// });


// Earn points function
function earnPoint(multiplier = 1) {
    if (simulationType = SIMULATIONTYPE.FAST) {
        points += 1 * multiplier;

        if (Math.floor(Math.random() * 100) == 0) {
            spoints += points * (0.01 + 0.01 * level) * multiplier;
        }
    }

    if (simulationType = SIMULATIONTYPE.SLOW) {
        for (let i = 0; i < multiplier; i++) {
            points += 1;
    
            if (Math.floor(Math.random() * 100) == 0) {
                spoints += points * (0.01 + 0.01 * level);
            }
        }
    }

    if (RequiredLevelProgress(level + 1) <= points) {
        points -= RequiredLevelProgress(level + 1);
        level++;
    }
}

// Earning points - holding (clicking)
(() => {

    var holding = false;
    var holdingTime = 0;
    var holdingIntervalTime = () => Math.max(250, 2500 / (1 + 0.005 * holdingTime));
    var holdingInterval;

    listeners['mousedown']
        ? ''
        : listeners['mousedown']  = [];
    listeners['mousedown'].push(() => {
        holding = true;
        holdingInterval = setTimeout(tick, holdingIntervalTime());
    });

    listeners['mouseup'] ? ''
        : listeners['mouseup']  = [];
    listeners['mouseup'].push(() => {
        holding = false;
        holdingTime = 0;
        clearTimeout(holdingInterval);
    });

    intervals['100'] ? ''
        : intervals['100'].push(() => {
            if (holding) {
                holdingTime++;
            }
        });

    function tick() {
        earnPoint();
        holdingInterval = setTimeout(tick, holdingIntervalTime());
    }

  

})();









for (const type in listeners) {
    if (listeners.hasOwnProperty(type)) {
        addEventListener(type, e => {
            listeners[type].forEach(callback => callback());
        });
    }
}

for (const interval in intervals) {
    if (intervals.hasOwnProperty(interval)) {        
        setInterval(() => {
            intervals[interval].forEach(callback => callback);
        }, +interval);
    }
}