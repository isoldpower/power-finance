"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var http_js_1 = require("axios/lib/adapters/http.js");
// Force axios to use HTTP handler even in when environment is set to 'jsdom'
function mockAxiosHandler() {
    axios_1.default.defaults.adapter = http_js_1.default;
    global.XMLHttpRequest = undefined;
}
// Mock local storage for testing
function mockLocalStorage() {
    var localStorageMock = (function () {
        var store = {};
        return {
            getItem: function (key) { return store[key] || null; },
            setItem: function (key, value) { store[key] = value.toString(); }
        };
    })();
    Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
    });
}
mockAxiosHandler();
mockLocalStorage();
