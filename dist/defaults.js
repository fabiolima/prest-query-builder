"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._pagination = exports._pageOptions = void 0;
exports._pageOptions = {
    page: 1,
    pageSize: 10
};
exports._pagination = __assign(__assign({}, exports._pageOptions), { total: 0, totalPages: 0, nextPage: 0, prevPage: 0, isLast: false, isFirst: false, _q: 'string' });
