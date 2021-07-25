"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModel = exports._pagination = exports._pageOptions = void 0;
var Model_1 = __importDefault(require("./Model"));
var defaults_1 = require("./defaults");
Object.defineProperty(exports, "_pageOptions", { enumerable: true, get: function () { return defaults_1._pageOptions; } });
Object.defineProperty(exports, "_pagination", { enumerable: true, get: function () { return defaults_1._pagination; } });
var interfaces_1 = require("./interfaces");
Object.defineProperty(exports, "BaseModel", { enumerable: true, get: function () { return interfaces_1.BaseModel; } });
exports.default = Model_1.default;
