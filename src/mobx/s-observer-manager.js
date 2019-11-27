let nowObserver = null;
let nowTarget = null;
let observerStack = [];
let targetStack = [];
let isCollecting = false;

class ObserverManages {
    constructor() {
        this._observers = {};
    }

    _addNowObserver = (proxyID) => {
        this._observers[proxyID] = this._observers[proxyID] || {};
        this._observers[proxyID].target = nowTarget;
        this._observers[proxyID].watchers = this._observers[proxyID].watchers || [];
        this._observers[proxyID].watchers.push(nowObserver);
    };

    trigger = (id) => {
        let ds = this._observers[id];
        if (ds && ds.watchers) {
            ds.watchers.forEach(d => {
                d.call(ds.target || this);
            });
        }
    };

    beginCollect = (observer, target) => {
        isCollecting = true;
        observerStack.push(observer);
        targetStack.push(target);
        nowObserver = observerStack.length > 0 ? observerStack[observerStack.length - 1] : null;
        nowTarget = targetStack.length > 0 ? targetStack[targetStack.length - 1] : null;
    };

    collect = (proxyID) => {
        if (nowObserver) {
            this._addNowObserver(proxyID);
        }
    };

    endCollect = () => {
        isCollecting = false;
        observerStack.pop();
        targetStack.pop();
        nowObserver = observerStack.length > 0 ? observerStack[observerStack.length - 1] : null;
        nowTarget = targetStack.length > 0 ? targetStack[targetStack.length - 1] : null;
    };
}

export default new ObserverManages();