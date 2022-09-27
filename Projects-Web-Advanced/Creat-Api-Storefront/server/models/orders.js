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
exports.OrderStore = void 0;
// @ts-ignore
var database_1 = __importDefault(require("../database"));
var OrderStore = /** @class */ (function () {
    function OrderStore() {
    }
    OrderStore.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, rows, Sql_ord_pro, orders, _i, rows_1, order, result_rows, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "SELECT * FROM orders";
                        return [4 /*yield*/, conn.query(sql)
                            // const order =rows[0]
                            // command Sql order Products
                        ];
                    case 2:
                        rows = (_a.sent()).rows;
                        Sql_ord_pro = "SELECT product_id, quantity FROM order_products WHERE order_id=($1)";
                        orders = [];
                        _i = 0, rows_1 = rows;
                        _a.label = 3;
                    case 3:
                        if (!(_i < rows_1.length)) return [3 /*break*/, 6];
                        order = rows_1[_i];
                        return [4 /*yield*/, conn.query(Sql_ord_pro, [order.id])];
                    case 4:
                        result_rows = (_a.sent()).rows;
                        orders.push(__assign(__assign({}, order), { products: result_rows }));
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6:
                        conn.release();
                        return [2 /*return*/, orders];
                    case 7:
                        error_1 = _a.sent();
                        throw new Error("Could't Get Orders. ".concat(error_1));
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.create = function (order) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, status, products, conn, sql, result, order_1, Sql_ord_pro, order_products, _i, products_1, product, product_id, quantity, rows, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_id = order.user_id, status = order.status, products = order.products;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 2:
                        conn = _a.sent();
                        sql = "INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *";
                        return [4 /*yield*/, conn.query(sql, [user_id, status])];
                    case 3:
                        result = _a.sent();
                        order_1 = result.rows[0];
                        Sql_ord_pro = "INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING product_id, quantity";
                        order_products = [];
                        _i = 0, products_1 = products;
                        _a.label = 4;
                    case 4:
                        if (!(_i < products_1.length)) return [3 /*break*/, 7];
                        product = products_1[_i];
                        product_id = product.product_id, quantity = product.quantity;
                        return [4 /*yield*/, conn.query(Sql_ord_pro, [order_1.id, product_id, quantity])];
                    case 5:
                        rows = (_a.sent()).rows;
                        order_products.push(rows[0]);
                        _a.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7:
                        conn.release();
                        // return order && order products together as json
                        return [2 /*return*/, __assign(__assign({}, order_1), { products: order_products })];
                    case 8:
                        error_2 = _a.sent();
                        throw new Error("Sorry.... Could't Add New Order for User ".concat(user_id, ". ").concat(error_2));
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, rows, order, Sql_ord_pro, result_rows, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "SELECT * FROM orders WHERE user_id=($1)";
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        rows = (_a.sent()).rows;
                        order = rows[0];
                        Sql_ord_pro = "SELECT product_id, quantity FROM order_products WHERE order_id=($1)";
                        return [4 /*yield*/, conn.query(Sql_ord_pro, [id])];
                    case 3:
                        result_rows = (_a.sent()).rows;
                        conn.release();
                        return [2 /*return*/, __assign(__assign({}, order), { products: result_rows })];
                    case 4:
                        err_1 = _a.sent();
                        throw new Error("Could not find order ".concat(id, ". ").concat(err_1));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return OrderStore;
}());
exports.OrderStore = OrderStore;
