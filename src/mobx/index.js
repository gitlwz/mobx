import Observable from './s-observable.js';
import autorun from './s-autorun.js';
import {createObservable} from './s-extendObservable.js';

function observable(target, name, descriptor) {
    let v = descriptor.initializer.call(this);
    // 如果值是对象，为其值也创建observable
    if (typeof v === 'object') {
        createObservable(v);
    }
    let observable = new Observable(v);
    return {
        enumerable: true,
        configurable: true,
        get: function () {
            return observable.get();
        },
        set: function (v) {
            // 重新赋值对象的时候，为其值也创建observable
            if (typeof v === 'object') {
                createObservable(v);
            }
            return observable.set(v);
        }
    };
}



let ReactMixin = {
    componentWillMount: function () {
        autorun(() => {
            this.render();
            this.forceUpdate();
        });
    }
};

function observer(target) {
    const targetCWM = target.prototype.componentWillMount;
    target.prototype.componentWillMount = function () {
        targetCWM && targetCWM.call(this);
        ReactMixin.componentWillMount.call(this);
    }
}

export {
    observable,
    observer
}