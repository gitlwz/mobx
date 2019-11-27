import Observable from './s-observable.js';

let createObservableProperty = function (target, property) {
    let observable = new Observable(target[property]);
    Object.defineProperty(target, property, {
        get: function () {
            return observable.get();
        },
        set: function (value) {
            return observable.set(value);
        }
    });

    if (typeof (target[property]) === 'object') {
        for (let i in target[property]) {
            if (target[property].hasOwnProperty(i)) {
                createObservableProperty(target[property], i);
            }
        }
    }
};

let extendsObservable = function (target, obj) {
    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            target[i] = obj[i];
            createObservableProperty(target, i);
        }
    }
};

let createObservable = function (target) {
    for (let i in target) {
        if (target.hasOwnProperty(i)) {
            createObservableProperty(target, i);
        }
    }
};

export {
    extendsObservable,
    createObservable
}