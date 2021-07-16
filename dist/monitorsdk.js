(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}((function () { 'use strict';

    function test() {
        console.log(1);
        return 1;
    }
    test();

})));
