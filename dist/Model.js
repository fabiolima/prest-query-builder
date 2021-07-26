"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var interfaces_1 = require("./interfaces");
var defaults_1 = require("./defaults");
var Model = /** @class */ (function (_super) {
    __extends(Model, _super);
    function Model(config) {
        var _this = _super.call(this, axios_1.default) || this;
        _this.pipeline = [];
        _this.paginate = false;
        _this._pagination = {};
        _this.config = config;
        return _this;
    }
    Model.prototype.baseUrl = function () {
        return this.config.url || "" + (this.config.https ? 'https://' : 'http://') + this.config.domain + "/" + this.config.db + "/public/" + this.config.table;
    };
    Model.prototype.where = function (wQuery) {
        var q = wQuery.field + "=" + wQuery.operator + "." + wQuery.value;
        this.pipeline.push(q);
        return this;
    };
    Model.prototype.select = function (fields) {
        var q = "_select=" + fields.join(',');
        this.pipeline.push(q);
        return this;
    };
    Model.prototype.join = function (jQuery) {
        var q = "_join=" + jQuery.type + ":" + jQuery.tableJoin + ":" + jQuery.tableJoin + "." + jQuery.tableJoinKey + ":" + jQuery.operator + ":" + jQuery.table + "." + jQuery.tableKey;
        this.pipeline.push(q);
        return this;
    };
    Model.prototype.count = function (field) {
        var _this = this;
        if (field === void 0) { field = '*'; }
        this.pipeline.push("_count=" + field);
        var queryString = '?' + this.pipeline.join('&');
        var endpoint = "" + this.baseUrl() + queryString;
        return this.client
            .get(endpoint)
            .then(function (response) { return response.data.count; })
            .then(function (count) {
            _this.paginate = false;
            _this.pipeline = [];
            return count;
        });
    };
    Model.prototype.pagination = function (paginationOptions) {
        if (paginationOptions === void 0) { paginationOptions = defaults_1._pageOptions; }
        var q = "_page=" + paginationOptions.page + "&_page_size=" + paginationOptions.pageSize;
        this._pagination = __assign(__assign(__assign({}, defaults_1._pagination), paginationOptions), { _q: q });
        this.paginate = true;
        this.pipeline.push(q);
        return this;
    };
    Model.prototype.buildPagination = function (_a) {
        var total = _a.total, pageSize = _a.pageSize, page = _a.page;
        var totalPages = 0;
        var nextPage = 0;
        var prevPage = 0;
        var isLast = false;
        var isFirst = false;
        if (total === 0)
            totalPages = 0;
        if (total > 0 && total <= pageSize)
            totalPages = 1;
        if (total > 0)
            totalPages = Math.ceil(total / this._pagination.pageSize);
        nextPage = page + 1;
        prevPage = page > 1 ? page - 1 : 1;
        isLast = page === totalPages;
        isFirst = page === 1;
        return {
            page: page,
            pageSize: pageSize,
            total: total,
            totalPages: totalPages,
            nextPage: nextPage,
            prevPage: prevPage,
            isLast: isLast,
            isFirst: isFirst
        };
    };
    Model.prototype.run = function () {
        var _this = this;
        var queryString = '?' + this.pipeline.join('&');
        var endpoint = "" + this.baseUrl() + queryString;
        return this.client
            .get(endpoint)
            .then(function (response) { return __awaiter(_this, void 0, void 0, function () {
            var totalEndpoint, total, pagination;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.paginate)
                            return [2 /*return*/, response.data];
                        console.log(this._pagination);
                        totalEndpoint = endpoint.replace(this._pagination._q, '');
                        return [4 /*yield*/, this.client
                                .get(totalEndpoint + '&_count=*')
                                .then(function (r) { return r.data.count; })
                                .catch(function () { return 0; })];
                    case 1:
                        total = _a.sent();
                        pagination = this.buildPagination({
                            total: total,
                            pageSize: this._pagination.pageSize,
                            page: this._pagination.page
                        });
                        return [2 /*return*/, {
                                pagination: pagination,
                                items: response.data
                            }];
                }
            });
        }); })
            .then(function (response) {
            _this.paginate = false;
            _this.pipeline = [];
            return response;
        });
    };
    return Model;
}(interfaces_1.BaseModel));
exports.default = Model;
