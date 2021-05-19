"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
require("express-async-errors");
var allow_cors_1 = __importDefault(require("./middlewares/allow-cors"));
var error_handler_1 = __importDefault(require("./middlewares/error-handler"));
var request_logger_1 = __importDefault(require("./middlewares/request-logger"));
var search_1 = __importDefault(require("./routes/search"));
var current_1 = __importDefault(require("./routes/current"));
var not_found_error_1 = __importDefault(require("./errors/not-found-error"));
var body_parser_1 = require("body-parser");
var app = express_1.default();
exports.app = app;
//Allow CORS for development sake... Remove in build
app.use(allow_cors_1.default);
app.use(body_parser_1.json());
app.use(request_logger_1.default);
app.use(search_1.default);
app.use(current_1.default);
app.all('*', function (req, res) {
    throw new not_found_error_1.default();
});
app.use(error_handler_1.default);
