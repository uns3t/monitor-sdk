class Dep {
  id: Date;
  subs: Watch[];
  static watch: Watch;

  constructor() {
    this.id = new Date();
    this.subs = [];
  }

  defined(): void {
    Dep.watch.add(this);
  }

  notify(): void {
    this.subs.forEach((item) => {
      if (typeof item.update === "function") {
        try {
          item.update.apply(item);
        } catch (err) {
          console.warn(err);
        }
      }
    });
  }
}

class Watch {
  name: string;
  id: Date;
  callback: (name: string) => {};

  constructor(name: string, fn: (name: string) => {}) {
    this.name = name;
    this.id = new Date();
    this.callback = fn;
  }

  add(dep: Dep) {
    dep.subs.push(this);
  }

  update() {
    const cb = this.callback;
    cb(this.name);
  }
}

const addHistoryMethod = (function () {
  const historyDep = new Dep();
  return function (name: string) {
    if (name === "historychange") {
      return function (name: string, fn: any) {
        const event = new Watch(name, fn);
        Dep.watch = event;
        historyDep.defined();
        Dep.watch = null;
      };
    } else if (name === "pushState" || name === "replaceState") {
      const method = history[name];
      return function () {
        method.apply(history, arguments);
        historyDep.notify();
      };
    }
  };
})();

const initPvMonitor = () => {
  window.addHistoryListener = addHistoryMethod("historychange");
  history.pushState = addHistoryMethod("pushState");
  history.replaceState = addHistoryMethod("replaceState");
};


export default initPvMonitor;