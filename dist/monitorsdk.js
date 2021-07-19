(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}((function () { 'use strict';

    var Dep = /** @class */ (function () {
        function Dep() {
            this.id = new Date();
            this.subs = [];
        }
        Dep.prototype.defined = function () {
            Dep.watch.add(this);
        };
        Dep.prototype.notify = function () {
            this.subs.forEach(function (item) {
                if (typeof item.update === "function") {
                    try {
                        item.update.apply(item);
                    }
                    catch (err) {
                        console.warn(err);
                    }
                }
            });
        };
        return Dep;
    }());
    var Watch = /** @class */ (function () {
        function Watch(name, fn) {
            this.name = name;
            this.id = new Date();
            this.callback = fn;
        }
        Watch.prototype.add = function (dep) {
            dep.subs.push(this);
        };
        Watch.prototype.update = function () {
            var cb = this.callback;
            cb(this.name);
        };
        return Watch;
    }());
    var addHistoryMethod = (function () {
        var historyDep = new Dep();
        return function (name) {
            if (name === "historychange") {
                return function (name, fn) {
                    var event = new Watch(name, fn);
                    Dep.watch = event;
                    historyDep.defined();
                    Dep.watch = null;
                };
            }
            else if (name === "pushState" || name === "replaceState") {
                var method_1 = history[name];
                return function () {
                    method_1.apply(history, arguments);
                    historyDep.notify();
                };
            }
        };
    })();
    var initPvMonitor = function () {
        window.addHistoryListener = addHistoryMethod("historychange");
        history.pushState = addHistoryMethod("pushState");
        history.replaceState = addHistoryMethod("replaceState");
    };

    initPvMonitor();
    window.addHistoryListener('history', function () {
        console.log('窗口的history改变了');
    });

})));
