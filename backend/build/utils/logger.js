"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = require("winston");
var printf = winston_1.format.printf, combine = winston_1.format.combine, timestamp = winston_1.format.timestamp, errors = winston_1.format.errors;
var levels = {
    request: 0,
    global: 1
};
var logFormat = printf(function (_a) {
    var level = _a.level, message = _a.message, timestamp = _a.timestamp, stack = _a.stack;
    return "[" + timestamp + "] [" + level + "]: " + (stack || message);
});
var logger = winston_1.createLogger({
    format: combine(timestamp(), errors({ stack: true }), logFormat),
    levels: levels,
    transports: [
        new winston_1.transports.Console({
            level: 'global'
        }),
        new winston_1.transports.File({
            filename: 'logs/requests.log',
            level: 'request'
        })
    ]
});
exports.default = logger;
