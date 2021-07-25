"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __importDefault(require("./"));
var userModel = new _1.default({
    domain: '// domain ',
    db: '// database',
    table: '// table',
    https: false
});
var users = userModel
    .where({ field: 'name', operator: '$eq', value: 'Luiz' })
    .pagination({ page: 1, pageSize: 10 })
    .run()
    .then(function (response) {
    console.log(response);
})
    .catch(function (request) {
    console.log(request.response);
});
console.log(users);
