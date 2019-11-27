import observerManagers from './s-observer-manager.js';

const autorun = function (handler) {
    observerManagers.beginCollect(handler);
    handler();
    observerManagers.endCollect();
};

export default autorun