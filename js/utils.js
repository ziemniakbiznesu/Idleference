function Guid(length = 16) {
    return 'x'.repeat(length).replace(/x/ig, c => Math.floor(Math.random() * 36).toString(36));
}

function notate(x) {
    var e = Math.floor(Math.log10(x));
    var m = Math.floor(x / 10 ** (e - 2)) / 100;

    if (e < 3) {
        return Math.floor(x * 1000) / 1000;
    } else {
        return `${m}e${e}`;
    }
}




class ListenersController {
    constructor() {
        this.listeners = {};
    }

    add(type, callback) {
        var id = Guid();

        this.listeners[type] ? ''
            : this.listeners[type] = [];

            this.listeners[type].push({ id, callback });
        return id;
    }

    remove(id) {
        for (const key in this.listeners) {
            if (Array.isArray(this.listeners[key])) {
                this.listeners[key] = this.listeners[key].filter(x => x.id !== id);
            }
        }
    }

    init() {
        for (const type in this.listeners) {
            if (this.listeners.hasOwnProperty(type)) {
                addEventListener(type, e => {
                    this.listeners[type].forEach(listener => listener.callback(e));
                });
            }
        }
    }
}

class IntervalsController {
    constructor() {
        this.intervals = {};
    }

    add(interval, callback) {
        var id = Guid();

        this.intervals[interval] ? ''
            : this.intervals[interval] = [];

        this.intervals[interval].push({ id, callback });
        return id;
    }

    remove(id) {
        for (const key in this.intervals) {
            if (Array.isArray(this.intervals[key])) {
                this.intervals[key] = this.intervals[key].filter(x => x.id !== id);
            }
        }
    }

    init() {
        for (const interval in this.intervals) {
            if (this.intervals.hasOwnProperty(interval)) {
                setInterval(() => {
                    this.intervals[interval].forEach(x => x.callback());
                }, +interval);
            }
        }
    }
}