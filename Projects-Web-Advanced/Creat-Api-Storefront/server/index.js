"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var products_1 = __importDefault(require("./handlers/products"));
var users_1 = __importDefault(require("./handlers/users"));
var orders_1 = __importDefault(require("./handlers/orders"));
var app = (0, express_1.default)();
var LinkHost = '127.0.0.1:2020';
// const router = express.Router();
var morgan = require('morgan');
// بيظهر نوع الطلب ف الكونسل 
app.use(morgan(':method :url :response-time'));
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
///////////////////////////////////////////////
(0, products_1.default)(app);
(0, users_1.default)(app);
(0, orders_1.default)(app);
// //////////////////////////////////////////////////////
// page not found
// app.use((_req: express.Request, res: express.Response) => {
//   res.status(404);
//   fs.readFile('../Project-Web-Advanced/views/images/404.jpg',
//     (_err: Error, img: string ) => res.end(img));
// });
app.listen(2020, function () {
    console.log("starting app on: ".concat(LinkHost));
});
exports.default = app;
