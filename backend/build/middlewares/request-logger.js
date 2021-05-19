"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __importDefault(require("../utils/logger"));
var loggerMiddleware = function (req, res, next) {
    logger_1.default.log('request', "IP: " + req.ip + " METHOD: " + req.method + " URL: " + req.url + " BODY: " + JSON.stringify(req.body));
    next();
};
exports.default = loggerMiddleware;
